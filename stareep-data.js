// Stareep 3/4/5 month order data extracted from Excel
const STAREEP_ORDERS = {
  "3月": {
    summary: { sales: 157268, cost: 92512, grossProfit: 64756 },
    orders: [
      { id: "1005983", customer: "张S/孙R", sales: 5980, cost: 1400, grossProfit: 1840, deposit: 28000, balance: 28768, items: ["床架 ML60 180×200", "床垫 MF10 180×200", "CN-FI10Z 床屏", "BK10 BF30", "乐高底座"] },
      { id: "1005991", customer: "付豪", sales: 1280, cost: 400, grossProfit: -400, deposit: 28000, balance: 28768, items: ["枕头 PC50 S 2"] },
      { id: "1005981", customer: "龚玲", sales: 10800, cost: 3750, grossProfit: 1179, deposit: 5000, balance: 5500, items: ["床垫 MF10 2.0×2.2", "乐高底座 F110", "乐高 1.8×2.0", "CN-FI13 床屏", "CN-MI20 智能床垫", "CN-BL20 智能床垫", "床头柜 智能底座"] },
      { id: "1005976", customer: "姜总", sales: 0, cost: 856, grossProfit: -856, deposit: 10000, balance: 15000, items: ["枕头 PC50 2"] },
      { id: "1005980", customer: "黎秀娜", sales: 21800, cost: 6415, grossProfit: 4799, deposit: 0, balance: 45000, items: ["S3 Air 智能床垫", "乐高 枕头"] },
      { id: "1005983-2", customer: "袁小姐", sales: 6280, cost: 1400, grossProfit: 1830, deposit: 20000, balance: 0, items: ["床架 180×200"] }
    ]
  },
  "4月": {
    summary: { sales: 33983, cost: 18015, grossProfit: 15296 },
    orders: [
      { id: "1005981", customer: "刘小姐", sales: 4699, cost: 700, grossProfit: 2162, deposit: 13800, balance: 0, items: ["床垫 MF10 CN-BC21"] },
      { id: "1005981-2", customer: "刘小姐", sales: 7580, cost: 2960, grossProfit: 1657, deposit: 13800, balance: 0, items: ["床架 CN-BF30"] },
      { id: "1005978", customer: "刘小姐", sales: 5980, cost: 2480, grossProfit: 1162, deposit: 13800, balance: 0, items: ["床架 1.5×2.0"] },
      { id: "1005978-2", customer: "刘小姐", sales: 4399, cost: 595, grossProfit: 2084, deposit: 13800, balance: 0, items: ["床垫 MF10 CN-BC21 BF30"] },
      { id: "1005987", customer: "傅姐", sales: 1000, cost: 2000, grossProfit: -1000, deposit: 15000, balance: 0, items: ["带储物 黑色皮 2"] },
      { id: "1005995", customer: "朱S", sales: 1699, cost: 248, grossProfit: 853, deposit: 1100, balance: 0, items: ["扫地机器人 黑色11"] },
      { id: "1005995-2", customer: "张玉", sales: 3999, cost: 857, grossProfit: 943, deposit: 1800, balance: 0, items: ["智能戒指"] },
      { id: "1005995-3", customer: "外国人", sales: 3999, cost: 857, grossProfit: 243, deposit: 1100, balance: 0, items: ["智能戒指"] }
    ]
  },
  "5月": {
    summary: { sales: 108397, cost: 68817, grossProfit: 39580 },
    orders: [
      { id: "1005995", customer: "朱S", sales: 58184, cost: 30399, grossProfit: 19851, deposit: 18000, balance: 12399, items: ["BF10 床架 150×200", "BC40 床架 150×200", "FI21 床架 150×200", "F110 智能床垫 180×200", "ML30 智能床垫 180×200", "除螨仪（赠送）"] },
      { id: "1005996", customer: "鸟儿", sales: 58184, cost: 30399, grossProfit: 19851, deposit: 18000, balance: 12399, items: ["BF10 床架 150×200", "BC40 床架 150×200", "FI21 床架 150×200", "F110 智能床垫 180×200", "ML30 智能床垫 180×200", "除螨仪（赠送）"] },
      { id: "1005997", customer: "乌S", sales: 42380, cost: 19999, grossProfit: 12651, deposit: 12000, balance: 7999, items: ["FI21 床架 150×200", "MC30 智能床垫 180×200", "除螨仪（赠送）"] },
      { id: "1005998", customer: "陈少", sales: 50644, cost: 27600, grossProfit: 21324, deposit: 16600, balance: 11000, items: ["BF10 床架 150×200 ×3", "F111 床架 150×200", "MK20 底垫（2件）", "除螨仪（赠送）"] }
    ]
  }
};

// Monthly totals for comparison
const STAREEP_MONTHLY_SUMMARY = {
  "3月": { sales: 157268, grossProfit: 64756, expense: 0, netProfit: 64756 },
  "4月": { sales: 33983, grossProfit: 15296, expense: 0, netProfit: 15296 },
  "5月": { sales: 108397, grossProfit: 39580, expense: 0, netProfit: 39580 },
  "总计": { sales: 299648, grossProfit: 119632, expense: 0, netProfit: 119632 }
};
