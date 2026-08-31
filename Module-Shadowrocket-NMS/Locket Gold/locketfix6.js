const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "🇻🇳 2/9 SPECIAL EVENT 🇻🇳\n✨ Locket Gold • Chào mừng Quốc Khánh ✨!";

var locket02 = {
    is_sandbox: !1,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2027-09-02T23:59:59Z",   // ngày hết hạn
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2027-09-002T00:00:00Z", // ngày mua
    purchase_date: "2027-09-02T00:00:00Z",          // ngày mua
    store: "app_store"
};

var locket01 = {
    grace_period_expires_date: null,
    purchase_date: "2027-09-02T00:00:00Z",          // ngày mua
    product_identifier: "com.locket02.premium.yearly",
    expires_date: "2027-09-02T23:59:59Z"            // ngày hết hạn
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
    let [e, s] = mapping[match];
    if (s) {
        locket01.product_identifier = s;
        obj.subscriber.subscriptions[s] = locket02;
    } else {
        obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
    }
    obj.subscriber.entitlements[e] = locket01;
} else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
    obj.subscriber.entitlements.pro = locket01;
}

$done({ body: JSON.stringify(obj) });
