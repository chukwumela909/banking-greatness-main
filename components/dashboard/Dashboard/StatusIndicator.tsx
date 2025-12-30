export default function StatusIndicator({
  data,
}: {
  data: { isPaidOpeningDeposit: boolean; paymentVerification: boolean };
}) {
  let status: "Pending" | "Not Verified" | "Verified";
  let colorClasses: string;

  if (data.isPaidOpeningDeposit && data.paymentVerification) {
    status = "Verified";
    colorClasses = "text-green-400 bg-green-300/20 border-green-400/20";
  } else if (data.isPaidOpeningDeposit && !data.paymentVerification) {
    status = "Pending";
    colorClasses = "text-yellow-400 bg-yellow-300/20 border-yellow-400/20";
  } else {
    status = "Not Verified";
    colorClasses = "text-red-400 bg-red-300/20 border-red-400/20";
  }

  return (
    <div
      className={`${colorClasses} rounded py-1 px-2 border text-xs font-semibold`}
    >
      {status}
    </div>
  );
}
