// ===== HP Accounting App — Core Logic =====
// Brand data: 2026 ZOLANO + Nikator profit figures from the Excel file

const BRAND_DATA = {
  zolano: {
    label: "ZOLANO",
    color: "#8b5cf6",
    monthly: {
      1: { sales: 228892, cost: 228892, grossProfit: 95982, expenses: { rent: 30000, wages: 8000, electricity: 3000, delivery: 3000, subsidy: 12000 } },
      2: { sales: 43000, cost: 43000, grossProfit: 14643, expenses: { rent: 30000, wages: 0, electricity: 3000, delivery: 0, subsidy: 0 } },
      3: { sales: 76620, cost: 76620, grossProfit: 30627, expenses: { rent: 30000, wages: 5000, electricity: 3000, delivery: 2000, subsidy: 15600 } },
      4: { sales: 33699, cost: 33699, grossProfit: 15481, expenses: { rent: 30000, wages: 5000, electricity: 3000, delivery: 3000, subsidy: 17000 } },
      5: { sales: 63741, cost: 63741, grossProfit: 32307, expenses: { rent: 30000, wages: 5000, electricity: 3000, delivery: 300, subsidy: 0 } },
    }
  },
  nikator: {
    label: "尼卡托",
    color: "#06b6d4",
    monthly: {
      1: { sales: 151995, cost: 94569, grossProfit: 57427, expenses: { rent: 25360, wages: 6000, electricity: 3000, delivery: 3000, subsidy: 0 } },
      2: { sales: 0, cost: 0, grossProfit: 0, expenses: { rent: 25360, wages: 0, electricity: 3000, delivery: 0, subsidy: 0 } },
      3: { sales: 50000, cost: 27059, grossProfit: 22941, expenses: { rent: 25360, wages: 5000, electricity: 3000, delivery: 1500, subsidy: 0 } },
      4: { sales: 93258, cost: 37542, grossProfit: 55716, expenses: { rent: 25360, wages: 5000, electricity: 3000, delivery: 2400, subsidy: 0 } },
      5: { sales: 8635, cost: 4444, grossProfit: 4191, expenses: { rent: 25360, wages: 5000, electricity: 3000, delivery: 400, subsidy: 0 } },
    }
  }
};

// ===== State Management =====
let state = {
  currentBrand: "zolano",
  currentYear: 2026,
  records: [], // user-entered records
  stream: null,
};

// Load persisted data
function loadState() {
  try {
    const saved = localStorage.getItem("hp_accounting_records");
    if (saved) state.records = JSON.parse(saved);
    const savedBrand = localStorage.getItem("hp_accounting_brand");
    if (savedBrand) state.currentBrand = savedBrand;
    const savedYear = localStorage.getItem("hp_accounting_year");
    if (savedYear) state.currentYear = parseInt(savedYear);
    const webhook = localStorage.getItem("hp_accounting_webhook");
    if (webhook) document.getElementById("webhookUrl").value = webhook;
  } catch (e) { console.warn("Failed to load state:", e); }
}

function saveRecords() {
  localStorage.setItem("hp_accounting_records", JSON.stringify(state.records));
}

function formatMoney(n) {
  if (n >= 10000) return "¥" + (n / 10000).toFixed(1) + "万";
  return "¥" + n.toLocaleString();
}

// ===== Page Navigation =====
function switchPage(btn) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(btn.dataset.page).classList.add("active");

  // Stop camera when leaving scanner page
  if (btn.dataset.page !== "pageScanner") {
    stopCamera();
  }

  // Refresh data
  if (btn.dataset.page === "pageDashboard") renderDashboard();
  if (btn.dataset.page === "pageReports") renderReports();
}

// ===== Brand Tabs =====
document.querySelectorAll(".brand-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".brand-tab").forEach(t => {
      t.className = "brand-tab";
    });
    const brand = tab.dataset.brand;
    state.currentBrand = brand;
    localStorage.setItem("hp_accounting_brand", brand);
    tab.classList.add(brand === "zolano" ? "active-zolano" : "active-nikator");
    renderDashboard();
  });
});

// ===== Year Selector =====
document.querySelectorAll(".year-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.currentYear = parseInt(btn.dataset.year);
    localStorage.setItem("hp_accounting_year", state.currentYear);
    renderDashboard();
    renderReports();
  });
});

// ===== Dashboard Render =====
function renderDashboard() {
  const brand = BRAND_DATA[state.currentBrand];
  const year = state.currentYear;
  const months = Object.keys(brand.monthly).map(Number).sort((a, b) => a - b);

  // Quick stats
  let totalSales = 0, totalGross = 0, totalExpenses = 0;
  months.forEach(m => {
    const d = brand.monthly[m];
    totalSales += d.sales;
    totalGross += d.grossProfit;
    totalExpenses += Object.values(d.expenses).reduce((s, v) => s + v, 0);
  });
  const profit = totalGross - totalExpenses;
  const margin = totalSales > 0 ? ((profit / totalSales) * 100).toFixed(1) : 0;

  document.getElementById("statSales").textContent = formatMoney(totalSales);
  document.getElementById("statSales").style.color = brand.color;
  document.getElementById("statProfit").textContent = formatMoney(profit);
  document.getElementById("statProfit").style.color = profit >= 0 ? "var(--green)" : "var(--red)";
  document.getElementById("statMargin").textContent = margin + "%";

  // Month grid
  const grid = document.getElementById("monthGrid");
  grid.innerHTML = "";
  months.forEach(m => {
    const d = brand.monthly[m];
    const monthProfit = d.grossProfit - Object.values(d.expenses).reduce((s, v) => s + v, 0);
    const div = document.createElement("div");
    div.className = "month-cell " + (monthProfit >= 0 ? "profit" : "loss");
    div.innerHTML = `<div class="m-label">${m}月</div><div class="m-val">${formatMoney(monthProfit)}</div>`;
    grid.appendChild(div);
  });

  // Cost breakdown bars
  const costDiv = document.getElementById("costBreakdown");
  costDiv.innerHTML = "";
  const expenseLabels = { rent: "租金", wages: "工资", electricity: "电费", delivery: "送货费", subsidy: "补助" };
  const expenseColors = { rent: "#ef4444", wages: "#f59e0b", electricity: "#3b82f6", delivery: "#22c55e", subsidy: "#8b5cf6" };
  let maxExpense = 0;
  months.forEach(m => {
    Object.entries(brand.monthly[m].expenses).forEach(([k, v]) => {
      if (v > maxExpense) maxExpense = v;
    });
  });
  Object.entries(expenseLabels).forEach(([key, label]) => {
    const total = months.reduce((s, m) => s + (brand.monthly[m].expenses[key] || 0), 0);
    const pct = maxExpense > 0 ? (total / maxExpense * 100) : 0;
    const bar = document.createElement("div");
    bar.className = "comp-bar";
    bar.innerHTML = `
      <span class="bar-label">${label}</span>
      <div class="bar-bg"><div class="bar-fill" style="width:${pct}%;background:${expenseColors[key]}"></div></div>
      <span class="bar-val">${formatMoney(total)}</span>
    `;
    costDiv.appendChild(bar);
  });

  // Brand comparison
  renderComparison();

  // Recent history
  renderHistory();

  // Storage
  updateStorageUsage();
}

function renderComparison() {
  const container = document.getElementById("comparisonBars");
  container.innerHTML = "";

  const brands = ["zolano", "nikator"];
  const year = state.currentYear;

  let totalSales = 0, totalProfit = 0;
  const brandTotals = {};
  brands.forEach(b => {
    const bd = BRAND_DATA[b];
    const months = Object.keys(bd.monthly).map(Number);
    let s = 0, p = 0;
    months.forEach(m => {
      const d = bd.monthly[m];
      s += d.sales;
      p += d.grossProfit - Object.values(d.expenses).reduce((ss, v) => ss + v, 0);
    });
    brandTotals[b] = { sales: s, profit: p };
    totalSales += s;
    totalProfit += p;
  });

  brands.forEach(b => {
    const bt = brandTotals[b];
    const pct = totalSales > 0 ? (bt.sales / totalSales * 100) : 0;
    const bar = document.createElement("div");
    bar.className = "comp-bar";
    bar.innerHTML = `
      <span class="bar-label">${BRAND_DATA[b].label}</span>
      <div class="bar-bg"><div class="bar-fill" style="width:${pct}%;background:${BRAND_DATA[b].color}"></div></div>
      <span class="bar-val">${formatMoney(bt.sales)}</span>
    `;
    container.appendChild(bar);
  });
}

function renderHistory() {
  const container = document.getElementById("recentHistory");
  const records = [...state.records].reverse().slice(0, 10);

  if (records.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">暂无扫描记录<br>去扫描页面拍一张订单吧</div></div>';
    return;
  }

  container.innerHTML = "";
  records.reverse().forEach(r => {
    const div = document.createElement("div");
    div.className = "history-item";
    const profit = r.sales - r.cost;
    div.innerHTML = `
      <div class="history-icon ${r.brand}">${r.brand === "zolano" ? "🛋" : "💺"}</div>
      <div class="history-info">
        <div class="h-brand">${BRAND_DATA[r.brand]?.label || r.brand}</div>
        <div class="h-detail">${r.customer || "未知客户"} · ${r.date || ""}</div>
      </div>
      <div class="history-amount ${profit >= 0 ? 'positive' : 'negative'}">${formatMoney(profit)}</div>
    `;
    container.appendChild(div);
  });
}

// ===== Reports =====
function renderReports() {
  const year = state.currentYear;
  const brands = ["zolano", "nikator"];
  let totalMonthSales = 0, totalMonthProfit = 0, totalYtdSales = 0, totalYtdProfit = 0;

  // Current month data (assume month 5 = May for demo)
  const currentMonth = new Date().getMonth() + 1;

  brands.forEach(b => {
    const bd = BRAND_DATA[b];
    Object.entries(bd.monthly).forEach(([m, d]) => {
      const mp = d.grossProfit - Object.values(d.expenses).reduce((s, v) => s + v, 0);
      totalYtdSales += d.sales;
      totalYtdProfit += mp;
      if (parseInt(m) === currentMonth) {
        totalMonthSales += d.sales;
        totalMonthProfit += mp;
      }
    });
  });

  document.getElementById("rptMonthSales").textContent = formatMoney(totalMonthSales);
  document.getElementById("rptMonthProfit").textContent = formatMoney(totalMonthProfit);
  document.getElementById("rptMonthProfit").style.color = totalMonthProfit >= 0 ? "var(--green)" : "var(--red)";
  document.getElementById("rptYtdSales").textContent = formatMoney(totalYtdSales);
  document.getElementById("rptYtdProfit").textContent = formatMoney(totalYtdProfit);
  document.getElementById("rptYtdProfit").style.color = totalYtdProfit >= 0 ? "var(--green)" : "var(--red)";

  // Monthly detail table
  const detailDiv = document.getElementById("monthlyDetail");
  detailDiv.innerHTML = "";
  brands.forEach(b => {
    const bd = BRAND_DATA[b];
    Object.entries(bd.monthly).sort((a, b) => a[0] - b[0]).forEach(([m, d]) => {
      const mp = d.grossProfit - Object.values(d.expenses).reduce((s, v) => s + v, 0);
      const row = document.createElement("div");
      row.className = "comp-bar";
      row.style.marginBottom = "4px";
      row.innerHTML = `
        <span class="bar-label">${m}月</span>
        <div class="bar-bg"><div class="bar-fill" style="width:${Math.abs(mp)/50000*100}%;background:${mp>=0?'var(--green)':'var(--red)'}"></div></div>
        <span class="bar-val">${formatMoney(mp)}</span>
      `;
      detailDiv.appendChild(row);
    });
  });

  // Brand comparison in reports
  const compDiv = document.getElementById("reportComparison");
  compDiv.innerHTML = "";
  brands.forEach(b => {
    const bd = BRAND_DATA[b];
    let s = 0, p = 0;
    Object.values(bd.monthly).forEach(d => {
      s += d.sales;
      p += d.grossProfit - Object.values(d.expenses).reduce((ss, v) => ss + v, 0);
    });
    const div = document.createElement("div");
    div.className = "comp-bar";
    div.innerHTML = `
      <span class="bar-label">${bd.label}</span>
      <div class="bar-bg"><div class="bar-fill" style="width:${p>0?p/60000*100:0}%;background:${bd.color}"></div></div>
      <span class="bar-val" style="color:${p>=0?'var(--green)':'var(--red)'}">${formatMoney(p)}</span>
    `;
    compDiv.appendChild(div);
  });
}

function generateReport() {
  const year = state.currentYear;
  let report = `=== ${year}年 会计报告 ===\n\n`;

  ["zolano", "nikator"].forEach(b => {
    const bd = BRAND_DATA[b];
    let totalSales = 0, totalProfit = 0;
    Object.values(bd.monthly).forEach(d => {
      totalSales += d.sales;
      totalProfit += d.grossProfit - Object.values(d.expenses).reduce((s, v) => s + v, 0);
    });
    report += `${bd.label}:\n  总业绩: ¥${totalSales.toLocaleString()}\n  总盈利: ¥${totalProfit.toLocaleString()}\n\n`;
  });

  report += `用户记录: ${state.records.length} 笔\n`;
  report += `生成时间: ${new Date().toISOString()}\n`;

  // Copy to clipboard
  navigator.clipboard?.writeText(report).then(() => {
    showToast("报告已复制到剪贴板");
  }).catch(() => {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = report;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("报告已复制到剪贴板");
  });
}

// ===== Camera / Scanner =====
async function handleCapture() {
  const video = document.getElementById("cameraVideo");
  const placeholder = document.getElementById("cameraPlaceholder");
  const canvas = document.getElementById("captureCanvas");
  const preview = document.getElementById("previewImg");
  const form = document.getElementById("manualForm");

  try {
    if (!state.stream) {
      state.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      video.srcObject = state.stream;
      video.style.display = "block";
      placeholder.style.display = "none";
    }

    // Capture frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    // Show preview
    preview.src = canvas.toDataURL("image/jpeg", 0.8);
    preview.style.display = "block";

    // Send to backend for OCR processing
    await sendToAccountingSystem(preview.src);

    // Show manual form
    form.style.display = "block";
    document.getElementById("formDate").value = new Date().toISOString().split("T")[0];

  } catch (err) {
    console.error("Camera error:", err);
    showToast("无法访问相机，请检查权限设置");
  }
}

function stopCamera() {
  if (state.stream) {
    state.stream.getTracks().forEach(t => t.stop());
    state.stream = null;
  }
  document.getElementById("cameraVideo").style.display = "none";
  document.getElementById("cameraVideo").srcObject = null;
  document.getElementById("cameraPlaceholder").style.display = "block";
  document.getElementById("previewImg").style.display = "none";
  document.getElementById("manualForm").style.display = "none";
}

async function sendToAccountingSystem(imageBase64) {
  const statusEl = document.getElementById("uploadStatus");
  statusEl.className = "upload-status loading";
  statusEl.style.display = "flex";
  statusEl.querySelector("span").textContent = "正在分析图片...";

  const webhook = localStorage.getItem("hp_accounting_webhook") || document.getElementById("webhookUrl").value;

  try {
    if (webhook) {
      // Send to webhook with image data
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order_photo",
          timestamp: new Date().toISOString(),
          image: imageBase64.substring(0, 100000) + "...", // truncate for demo
          status: "pending_processing"
        })
      });
      statusEl.className = "upload-status success";
      statusEl.querySelector("span").textContent = "✓ 已发送到会计系统";
    } else {
      // Store locally for offline
      const offlineQueue = JSON.parse(localStorage.getItem("hp_accounting_offline_queue") || "[]");
      offlineQueue.push({
        type: "order_photo",
        timestamp: new Date().toISOString(),
        image: imageBase64.substring(0, 100000),
        status: "pending_processing"
      });
      localStorage.setItem("hp_accounting_offline_queue", JSON.stringify(offlineQueue));
      statusEl.className = "upload-status success";
      statusEl.querySelector("span").textContent = "✓ 已保存到本地 (离线模式)";
    }
  } catch (err) {
    statusEl.className = "upload-status error";
    statusEl.querySelector("span").textContent = "✗ 发送失败: " + err.message;
  }

  setTimeout(() => { statusEl.style.display = "none"; }, 3000);
}

function submitOrder() {
  const brand = document.getElementById("formBrand").value;
  const customer = document.getElementById("formCustomer").value.trim();
  const order = document.getElementById("formOrder").value.trim();
  const sales = parseFloat(document.getElementById("formSales").value) || 0;
  const cost = parseFloat(document.getElementById("formCost").value) || 0;
  const date = document.getElementById("formDate").value;
  const product = document.getElementById("formProduct").value;
  const notes = document.getElementById("formNotes").value.trim();

  if (!sales || !date) {
    showToast("请填写销售业绩和日期");
    return;
  }

  const record = {
    id: Date.now(),
    brand,
    customer,
    order,
    sales,
    cost,
    profit: sales - cost,
    date,
    product,
    notes,
    createdAt: new Date().toISOString()
  };

  state.records.push(record);
  saveRecords();

  showToast("✓ 记录已保存");

  // Clear form
  document.getElementById("formCustomer").value = "";
  document.getElementById("formOrder").value = "";
  document.getElementById("formSales").value = "";
  document.getElementById("formCost").value = "";
  document.getElementById("formNotes").value = "";

  // Try to upload to webhook
  const webhook = localStorage.getItem("hp_accounting_webhook") || document.getElementById("webhookUrl").value;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "order_record",
        ...record
      })
    }).catch(() => {});
  }
}

// ===== Settings =====
function toggleSetting(el) {
  el.classList.toggle("on");
}

function updateStorageUsage() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length * 2; // UTF-16
    }
  }
  const kb = (total / 1024).toFixed(1);
  document.getElementById("storageUsed").textContent = kb + " KB";
}

function exportData() {
  const data = {
    records: state.records,
    exportDate: new Date().toISOString(),
    version: "1.0.0"
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hp-accounting-export-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("数据已导出");
}

function importData() {
  document.getElementById("importInput").click();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.records && Array.isArray(data.records)) {
        state.records = data.records;
        saveRecords();
        showToast(`已导入 ${data.records.length} 条记录`);
        renderDashboard();
      }
    } catch (err) {
      showToast("导入失败: 文件格式错误");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function clearData() {
  if (confirm("确定要清除所有数据吗？此操作不可恢复！")) {
    state.records = [];
    saveRecords();
    localStorage.removeItem("hp_accounting_offline_queue");
    showToast("数据已清除");
    renderDashboard();
  }
}

// ===== Toast =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== Init =====
loadState();
renderDashboard();

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
