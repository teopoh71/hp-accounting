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
  },
  stareep: {
    label: "希瑞 Stareep",
    color: "#f59e0b",
    monthly: {
      3: {
        sales: 157268,
        cost: 92512,
        grossProfit: 64756,
        orders: [
          { id: "1005983", customer: "张S/孙R", date: "2026.3.28", deposit: 28000, balance: 28768, items: [{ name: "床架", model: "ML60", spec: "180×200", color: "烟汲灰", retail: 22980, cost: 17235 }, { name: "床垫", model: "F110", spec: "180×200", color: "无", retail: 9800, cost: 7350 }, { name: "智能床垫", model: "MF10", spec: "180×200", color: "无", retail: 8780, cost: 6585 }, { name: "智能床垫", model: "MF10", spec: "180×200", color: "无", retail: 6580, cost: 3619 }, { name: "床屏", model: "CN-FI10Z", spec: "80×200", color: "无", retail: 10800, cost: 5940 }, { name: "床架", model: "BK10", spec: "180×200", color: "星漠卡其", retail: 6080, cost: 3240 }, { name: "床垫", model: "MF10", spec: "180×200", color: "乐高底座", retail: 6580, cost: 3619 }, { name: "床屏", model: "CN-FI10Z", spec: "180×200", color: "智能底座", retail: 10800, cost: 5940 }, { name: "床架", model: "BK10", spec: "180×200", color: "BF30", retail: 5980, cost: 3240 }],
          },
          { id: "1005991", customer: "付豪", date: "2026.3.21", deposit: 28000, balance: 28768, items: [{ name: "床垫", model: "MF10", spec: "180×200", color: "乐高底座", retail: 6580, cost: 3975 }, { name: "智能床垫", model: "F110", spec: "180×200", color: "无", retail: 10800, cost: 6525 }, { name: "枕头", model: "PC50", spec: "S", color: "2", retail: 1280, cost: 0 }] },
          { id: "1005981", customer: "龚玲", date: "2026.3.15", deposit: 5000, balance: 5500, items: [{ name: "床垫", model: "MF10", spec: "2.0×2.2", color: "1.8×2.0×23", retail: 24800, cost: 11318 }, { name: "床垫", model: "MF10", spec: "F110Z", color: "乐高底座", retail: 6580, cost: 3003 }, { name: "床垫", model: "乐高", spec: "1.8×2.0", color: "1.8×2.0×23", retail: 12600, cost: 5750 }, { name: "床屏", model: "CN-FI13", spec: "1.8×2.0", color: "无", retail: 10800, cost: 4929 }, { name: "智能床垫", model: "CN-MI20", spec: "1.8×2.0", color: "无", retail: 8800, cost: 3433 }, { name: "智能床垫", model: "CN-BL20", spec: "1.8×2.0", color: "无", retail: 56800, cost: 22157 }, { name: "床头柜", model: "CN-NL10", spec: "1.8×2.0", color: "无", retail: 37800, cost: 14745 }, { name: "智能床垫", model: "CN-PI20", spec: "2", color: "智能底座", retail: 5980, cost: 2333 }, { name: "智能床垫", model: "CN-PI20", spec: "2", color: "智能底座", retail: 5980, cost: 2333 }] },
          { id: "1005976", customer: "姜总", date: "2026.3.04", deposit: 10000, balance: 15000, items: [{ name: "枕头", model: "PC50", spec: "2", color: "智能底座", retail: 0, cost: 428 }, { name: "枕头", model: "PC50", spec: "2", color: "智能底座", retail: 0, cost: 400 }] },
          { id: "1005980", customer: "黎秀娜", date: "2026.3.06", deposit: 0, balance: 45000, items: [{ name: "智能床垫", model: "S3 Air", spec: "180×200", color: "智能底座", retail: 21800, cost: 11214 }, { name: "枕头", model: "乐高", spec: "180×200", color: "智能底座", retail: 10800, cost: 5556 }] },
          { id: "1005983-2", customer: "袁小姐", date: "2026.3.??", deposit: 20000, balance: 0, items: [{ name: "床架", model: "床架", spec: "180×200", color: "智能底座", retail: 6280, cost: 3230 }] }
        ],
        summary: { totalOrders: 6, totalSales: 157268, totalCost: 92512, totalProfit: 64756, totalDeposit: 91000, totalBalance: 78036, margin: "41.2%" },
        expenses: { rent: 0, wages: 0, electricity: 0, delivery: 0, subsidy: 0 }
      },
      4: {
        sales: 33983,
        cost: 18015,
        grossProfit: 15296,
        orders: [
          { id: "1005981", customer: "刘小姐", date: "2026.4.16", deposit: 13800, balance: 0, items: [{ name: "床垫", model: "CN-MF01C", spec: "CN-BC21", color: "无", retail: 4699, cost: 2862 }, { name: "床架", model: "CN-BF30", spec: "BF30", color: "无", retail: 7580, cost: 4617 }] },
          { id: "1005978", customer: "刘小姐", date: "2026.4.16", deposit: 13800, balance: 0, items: [{ name: "床架", model: "床架", spec: "1.5×2.0", color: "BF30", retail: 5980, cost: 3642 }, { name: "床垫", model: "MF10", spec: "CN-BC21", color: "BF30", retail: 4399, cost: 2679 }] },
          { id: "1005987", customer: "傅姐", date: "2026.4.25", deposit: 15000, balance: 0, items: [{ name: "床垫", model: "MF10", spec: "180×200", color: "乐高底座", retail: 6580, cost: 6580 }, { name: "枕头", model: "乐高", spec: "180×200", color: "智能床垫", retail: 10800, cost: 6580 }, { name: "床托", model: "MF10", spec: "2", color: "180×200", retail: 1000, cost: 1000 }, { name: "带储物", model: "黑色皮", spec: "2", color: "180×200", retail: 1000, cost: 1000 }] },
          { id: "1005995", customer: "朱S", date: "2026.4.14", deposit: 1100, balance: 0, items: [{ name: "扫地机器人", model: "黑色11", spec: "1", color: "1", retail: 1699, cost: 1100 }] },
          { id: "1005995-2", customer: "张玉", date: "2026.4.14", deposit: 1800, balance: 0, items: [{ name: "智能戒指", model: "1", spec: "1", color: "1", retail: 3999, cost: 1800 }] },
          { id: "1005995-3", customer: "外国人", date: "2026.4.14", deposit: 1100, balance: 0, items: [{ name: "智能戒指", model: "1", spec: "1", color: "1", retail: 3999, cost: 1100 }] }
        ],
        summary: { totalOrders: 6, totalSales: 33983, totalCost: 18015, totalProfit: 15296, totalDeposit: 58600, totalBalance: 0, margin: "45.0%" },
        expenses: { rent: 0, wages: 0, electricity: 0, delivery: 0, subsidy: 0 }
      },
      5: {
        sales: 88398,
        cost: 59910,
        grossProfit: 51759,
        orders: [
          { id: "1005995", customer: "朱S", date: "2026.5.21", deposit: 18000, balance: 12399, items: [{ name: "床架", model: "BF10", spec: "150×200", color: "S1-4701", retail: 5200, cost: 3820 }, { name: "床头", model: "BC40", spec: "150×200", color: "S1-6002", retail: 5200, cost: 4180 }, { name: "智能底座+床垫套餐", model: "F121+ML30", spec: "180×200", color: "无色", retail: 19999, cost: 7968 }] },
          { id: "1005996", customer: "鸟儿", date: "2026.5.24", deposit: 18000, balance: 12399, items: [{ name: "床架", model: "BF10", spec: "150×200", color: "S1-4701", retail: 5200, cost: 3820 }, { name: "床头", model: "BC40", spec: "150×200", color: "S1-6002", retail: 5200, cost: 4180 }, { name: "智能底座+床垫套餐", model: "F121+ML30", spec: "180×200", color: "无色", retail: 19999, cost: 7968 }] },
          { id: "1005997", customer: "乌S", date: "2026.5.21", deposit: 12000, balance: 7999, items: [{ name: "智能底座+床垫套餐", model: "F121+MC30", spec: "180×200", color: "无色", retail: 19999, cost: 7968 }] },
          { id: "1005998", customer: "陈少", date: "2026.5.29", deposit: 16600, balance: 11000, items: [{ name: "床架", model: "BF10", spec: "180×200", color: "S1-4701", retail: 5200, cost: 4200 }, { name: "床架", model: "BF10", spec: "150×200", color: "S1-6001", retail: 5200, cost: 3820 }, { name: "床架", model: "BF10", spec: "150×200", color: "S1-4702", retail: 5200, cost: 3820 }, { name: "床垫+底床套餐", model: "MF10+F111", spec: "180×200", color: "无色", retail: 8000, cost: 6690 }, { name: "底垫", model: "MK20", spec: "150×260", color: "无色", retail: 4000, cost: 3994 }] },
        ],
        summary: { totalOrders: 4, totalSales: 88398, totalCost: 56638, totalProfit: 51759, totalDeposit: 64600, totalBalance: 23799, margin: "58.6%" },
        expenses: { rent: 0, wages: 0, electricity: 0, delivery: 0, subsidy: 0 }
      }
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
    const savedStareepMonth = localStorage.getItem("hp_stareep_month");
    if (savedStareepMonth) state.stareepMonth = savedStareepMonth;
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
    tab.classList.add(brand === "zolano" ? "active-zolano" : brand === "nikator" ? "active-nikator" : "active-stareep");
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

  // Stareep: show order detail cards
  if (state.currentBrand === "stareep") {
    renderStareepOrders(brand);
    return;
  }

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

function renderStareepOrders(brand) {
  // Month selector for Stareep
  const months = ["3月", "4月", "5月"];
  if (!state.stareepMonth) state.stareepMonth = "5月";
  const monthNum = parseInt(state.stareepMonth.replace("月", ""));
  const data = brand.monthly[monthNum];
  if (!data) {
    // Fallback to first available month
    const firstMonth = months.find(m => brand.monthly[parseInt(m.replace("月", ""))]);
    state.stareepMonth = firstMonth || "5月";
    renderStareepOrders(brand);
    return;
  }
  const summary = data.summary;

  // Quick stats for Stareep
  document.getElementById("statSales").textContent = formatMoney(summary.totalSales);
  document.getElementById("statSales").style.color = brand.color;
  document.getElementById("statProfit").textContent = formatMoney(summary.totalProfit);
  document.getElementById("statProfit").style.color = "var(--green)";
  document.getElementById("statMargin").textContent = summary.margin;

  // Hide month grid, cost breakdown, comparison for Stareep
  document.getElementById("monthGrid").parentElement.style.display = "none";
  document.getElementById("costBreakdown").parentElement.style.display = "none";
  document.getElementById("comparisonCard").style.display = "none";

  // Show order cards
  const container = document.getElementById("monthGrid");
  container.parentElement.style.display = "block";
  container.parentElement.querySelector(".card-title").textContent = "订单详情";
  container.className = "stareep-orders";
  container.innerHTML = "";

  // Month selector
  const selDiv = document.createElement("div");
  selDiv.style.cssText = "display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;";
  months.forEach(m => {
    const btn = document.createElement("button");
    btn.textContent = m;
    btn.style.cssText = `padding:6px 14px;border-radius:8px;border:1px solid var(--border);background:${state.stareepMonth === m ? "var(--amber)" : "var(--card)"};color:${state.stareepMonth === m ? "#fff" : "var(--text)"};cursor:pointer;font-size:13px;font-weight:600;transition:all .2s;`;
    btn.onclick = () => { state.stareepMonth = m; localStorage.setItem("hp_stareep_month", m); renderDashboard(); };
    selDiv.appendChild(btn);
  });
  container.appendChild(selDiv);

  // 3-month summary row
  const allSummary = document.createElement("div");
  allSummary.style.cssText = "background:rgba(245,158,11,.08);border:1px solid var(--amber);border-radius:10px;padding:10px;margin-bottom:10px;display:flex;justify-content:space-around;text-align:center;";
  const total3mSales = months.reduce((s, m) => s + (brand.monthly[parseInt(m.replace("月", ""))]?.summary?.totalSales || 0), 0);
  const total3mProfit = months.reduce((s, m) => s + (brand.monthly[parseInt(m.replace("月", ""))]?.summary?.totalProfit || 0), 0);
  const total3mDeposit = months.reduce((s, m) => s + (brand.monthly[parseInt(m.replace("月", ""))]?.summary?.totalDeposit || 0), 0);
  const total3mBalance = months.reduce((s, m) => s + (brand.monthly[parseInt(m.replace("月", ""))]?.summary?.totalBalance || 0), 0);
  allSummary.innerHTML = `
    <div><div style="font-size:10px;color:var(--muted)">3个月总业绩</div><div style="font-size:14px;font-weight:700;color:var(--amber)">¥${(total3mSales/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:10px;color:var(--muted)">总毛利</div><div style="font-size:14px;font-weight:700;color:var(--green)">¥${(total3mProfit/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:10px;color:var(--muted)">已收定金</div><div style="font-size:14px;font-weight:700;color:var(--accent)">¥${(total3mDeposit/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:10px;color:var(--muted)">尾款</div><div style="font-size:14px;font-weight:700;color:var(--red)">¥${(total3mBalance/10000).toFixed(1)}万</div></div>
  `;
  container.appendChild(allSummary);

  data.orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "stareep-order-card";
    card.style.cssText = "background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px;";
    
    let itemsHtml = order.items.map(it => 
      `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px;">
        <span>${it.name} ${it.model}${it.spec ? '('+it.spec+')' : ''}</span>
        <span style="color:var(--green)">¥${(it.retail-it.cost).toLocaleString()}</span>
       </div>`
    ).join("");

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div>
          <div style="font-size:13px;font-weight:600;color:${brand.color}">#${order.id} · ${order.customer}</div>
          <div style="font-size:11px;color:var(--muted)">${order.date}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:700">¥${order.items.reduce((s,it)=>s+it.retail,0).toLocaleString()}</div>
          <div style="font-size:10px;color:var(--muted)">定金¥${order.deposit.toLocaleString()} / 尾款¥${order.balance.toLocaleString()}</div>
        </div>
      </div>
      ${itemsHtml}
    `;
    container.appendChild(card);
  });

  // Summary bar
  const sumBar = document.createElement("div");
  sumBar.style.cssText = "background:rgba(245,158,11,.1);border:1px solid var(--amber);border-radius:10px;padding:12px;margin-top:8px;display:flex;justify-content:space-around;text-align:center;";
  sumBar.innerHTML = `
    <div><div style="font-size:11px;color:var(--muted)">订单数</div><div style="font-size:16px;font-weight:700;color:var(--amber)">${summary.totalOrders}</div></div>
    <div><div style="font-size:11px;color:var(--muted)">总业绩</div><div style="font-size:16px;font-weight:700;color:var(--amber)">¥${(summary.totalSales/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:11px;color:var(--muted)">总毛利</div><div style="font-size:16px;font-weight:700;color:var(--green)">¥${(summary.totalProfit/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:11px;color:var(--muted)">已收定金</div><div style="font-size:16px;font-weight:700;color:var(--accent)">¥${(summary.totalDeposit/10000).toFixed(1)}万</div></div>
    <div><div style="font-size:11px;color:var(--muted)">尾款</div><div style="font-size:16px;font-weight:700;color:var(--red)">¥${(summary.totalBalance/10000).toFixed(1)}万</div></div>
  `;
  container.appendChild(sumBar);
}

function renderComparison() {
  const container = document.getElementById("comparisonBars");
  container.innerHTML = "";

  const brands = ["zolano", "nikator", "stareep"];
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
      <div class="history-icon ${r.brand}">${r.brand === "zolano" ? "🛋" : r.brand === "nikator" ? "💺" : "⭐"}</div>
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
  const brands = ["zolano", "nikator", "stareep"];
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

// ===== Patch System =====
function applyPatch() {
  const patchBtn = document.getElementById("patchBtn");
  patchBtn.disabled = true;
  patchBtn.textContent = "⏳ 加载中...";
  showToast("🔄 正在检查补丁...");

  fetch("https://teopoh71.github.io/hp-accounting/app.js")
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(remoteJs => {
      // Parse BRAND_DATA from remote by extracting the object literal
      const startIdx = remoteJs.indexOf("const BRAND_DATA");
      if (startIdx < 0) throw new Error("无法找到远程数据");
      let braceCount = 0;
      let dataStart = -1;
      for (let i = startIdx; i < remoteJs.length; i++) {
        if (remoteJs[i] === "{") {
          if (braceCount === 0) dataStart = i;
          braceCount++;
        } else if (remoteJs[i] === "}") {
          braceCount--;
          if (braceCount === 0) {
            const dataStr = remoteJs.substring(dataStart, i + 1);
            const parsed = new Function("return " + dataStr)();

            // Merge new data into current BRAND_DATA
            let merged = 0;
            for (const brand of Object.keys(parsed)) {
              if (BRAND_DATA[brand]) {
                for (const month of Object.keys(parsed[brand].monthly)) {
                  BRAND_DATA[brand].monthly[month] = parsed[brand].monthly[month];
                  merged++;
                }
              }
            }

            // Save patch version
            const oldVer = parseInt(localStorage.getItem("hp_patch_version") || "0");
            localStorage.setItem("hp_patch_version", String(oldVer + 1));
            localStorage.setItem("hp_patch_time", new Date().toISOString());

            renderDashboard();
            showToast("✅ 补丁已更新 — " + merged + " 个月数据已同步");
            patchBtn.textContent = "🔄 补丁";
            patchBtn.disabled = false;
            return;
          }
        }
      }
      throw new Error("数据解析失败");
    })
    .catch(err => {
      showToast("❌ 补丁失败: " + err.message);
      patchBtn.textContent = "🔄 补丁";
      patchBtn.disabled = false;
    });
}

// ===== Repair System =====
function repairApp() {
  showToast("🔧 正在修复应用...");
  // Clear corrupted localStorage
  localStorage.removeItem("hp_accounting_brand");
  localStorage.removeItem("hp_stareep_month");
  localStorage.removeItem("hp_patch_version");
  localStorage.removeItem("hp_current_year");
  state.currentBrand = "zolano";
  state.currentYear = 2026;
  state.stareepMonth = "5月";
  renderDashboard();
  showToast("✅ 修复完成 — 请重新选择品牌");
}

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
