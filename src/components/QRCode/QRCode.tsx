'use client';
import { useTimeStore } from '@/store/TimeContenxt';

export default function QRCode(
  { color }: { color: string } = { color: 'f5f1e8' },
) {
  const { paymentTimestamp, formData } = useTimeStore();

  const paymentDate = new Date(paymentTimestamp!);

  const pad = (num: number) => num.toString().padStart(2, '0');
  const day = pad(paymentDate.getDate());
  const month = pad(paymentDate.getMonth() + 1);
  const year = paymentDate.getFullYear();
  const hours = pad(paymentDate.getHours());
  const minutes = pad(paymentDate.getMinutes());

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  const qrString = `билет: серия: "QR200067000141", номер: "${year + month + day + 190609462}" дата: ${formattedTime}, маршрут: "${formData.number}", тип: "${formData.type}", номер: "${formData.vehicleId}"`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${500}x${500}&bgcolor=${color}&data=${encodeURIComponent(qrString)}`;

  return (
    <img
      src={qrCodeUrl}
      width={500}
      height={500}
      alt='QR Code'
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        imageRendering: 'pixelated',
      }}
    />
  );
}
