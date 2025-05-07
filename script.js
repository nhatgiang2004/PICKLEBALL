// Ví dụ dữ liệu; sau này bạn có thể load từ API hoặc form
const data = {
  ID: '1b8f6b5b',
  Date: '30/04/2025',
  Customer: 'Chị Yến - Mai Xuân Dương',
  Phone: '0914686887',
  Address: 'Mai Xuân Dương',
  Items: [
    { name: 'Kem dưỡng tái sinh…', qty: 1, price: 1550000 },
    { name: 'Xịt khoáng…', qty: 1, price: 0 }
  ],
  Discount: 0
};

// Format tiền
function fmt(n){ return n.toLocaleString('vi') + ' ₫'; }
// Chuyển số thành chữ (đơn giản)
function toWords(n){ /* bạn cài thư viện hoặc code riêng */ return 'Một triệu…'; }

window.onload = () => {
  // header
  document.getElementById('tx-id').textContent = data.ID;
  document.getElementById('tx-date').textContent = data.Date;
  document.getElementById('tx-customer').textContent = data.Customer;
  document.getElementById('tx-phone').textContent = data.Phone;
  document.getElementById('tx-address').textContent = data.Address;

  // items
  const tbody = document.getElementById('items-body');
  let sum = 0;
  data.Items.forEach((it,i)=>{
    const tr = document.createElement('tr');
    const amt = it.qty * it.price; sum += amt;
    tr.innerHTML = `<td>${i+1}</td>
      <td>${it.name}</td>
      <td class="text-right">${it.qty}</td>
      <td class="text-right">${fmt(it.price)}</td>
      <td class="text-right">${fmt(amt)}</td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('sum-total').textContent = fmt(sum);
  document.getElementById('discount').textContent = fmt(data.Discount);
  const finalTotal = sum - data.Discount;
  document.getElementById('final-total').textContent = fmt(finalTotal);

  document.getElementById('in-words').textContent = toWords(finalTotal);

  // QR code: dùng Google Chart API, mã lấy từ cột ma_thanh_toan = finalTotal
  const qrSrc = 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='
                + encodeURIComponent(finalTotal);
  document.getElementById('qr').src = qrSrc;
};
