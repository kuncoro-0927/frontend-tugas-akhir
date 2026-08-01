const PaymentMethodInfo = () => (
  <div className="mt-10">
    <h1 className="text-2xl font-bold">Pembayaran</h1>
    <p className="text-gray-950/50 mt-1 text-sm mb-5">
      Semua transaksi diproses melalui Midtrans dan dienkripsi secara aman.
    </p>

    <div className="rounded-xl border border-gray-300 bg-gray-100/50">
      <div className="rounded-t-xl px-3 py-4 border border-black/50 items-center justify-between flex">
        <h1 className="text-xs md:text-sm">Pembayaran via Midtrans</h1>
        <div className="flex items-center gap-3">
          <img className="md:w-12 w-8" src="/images/bni.svg" alt="" />
          <img className="md:w-14 w-8" src="/images/bri.svg" alt="" />
          <img className="md:w-14 w-8" src="/images/mandiri.svg" alt="" />
        </div>
      </div>

      <img className="w-40 mt-5 text-center mx-auto" src="/images/creditcard2.svg" alt="" />
      <p className="text-sm px-5 max-w-sm mb-5 text-center mx-auto mt-7">
        Setelah klik 'Bayar Sekarang', Anda akan diarahkan ke halaman
        pembayaran Midtrans untuk menyelesaikan transaksi dengan aman.
      </p>
    </div>
  </div>
);

export default PaymentMethodInfo;