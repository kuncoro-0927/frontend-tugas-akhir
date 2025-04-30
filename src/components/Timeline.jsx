// import {
//   Timeline,
//   TimelineBody,
//   TimelineContent,
//   TimelineItem,
//   TimelinePoint,
//   TimelineTitle,
// } from "flowbite-react";
// import { HiCalendar, HiTruck, HiCheckCircle } from "react-icons/hi";
// import { HiCurrencyDollar } from "react-icons/hi";

// const TimelinePengiriman = ({ status, createdAt, estimation }) => {
//   const steps = [
//     {
//       time: createdAt,
//       title: "Pembayaran Diterima",
//       body: "Pesanan Anda telah dibayar dan sedang diproses.",
//       icon: HiCurrencyDollar,
//     },
//     {
//       title: "Pesanan Dikirim",
//       body: `Pesanan sedang dalam perjalanan. Estimasi sampai: ${estimation}`,
//       icon: HiTruck,
//     },
//     {
//       title: "Pesanan Diterima",
//       body: "Pesanan telah diterima oleh pelanggan.",
//       icon: HiCheckCircle,
//     },
//     // Jika ada lebih dari 3 item, hanya 3 pertama yang akan ditampilkan
//   ].slice(0, 3); // Memastikan hanya 3 item yang diambil

//   const statusIndex =
//     {
//       paid: 0,
//       shipped: 1,
//       completed: 2,
//     }[status] ?? 0;

//   return (
//     <Timeline className="text-sm">
//       {steps.map((step, index) => {
//         // const isActive = index === statusIndex;
//         const isActive = index <= statusIndex;
//         const pointColor = isActive
//           ? "bg-blue-600 text-white"
//           : "bg-gray-300 text-gray-500";
//         const titleColor = isActive ? "text-blue-600" : "text-gray-400";
//         const bodyColor = isActive ? "text-gray-700" : "text-gray-400";

//         return (
//           <TimelineItem
//             key={index}
//             className="timeline-item-custom flex items-start "
//           >
//             <TimelinePoint
//               icon={step.icon}
//               className={`timeline-point h-4 w-4 ${pointColor}`}
//             />
//             <TimelineContent className="ml-2">
//               <TimelineTitle className={`text-xs font-medium ${titleColor}`}>
//                 {step.title}
//               </TimelineTitle>
//               <TimelineBody className={`text-xs ${bodyColor}`}>
//                 {step.body}
//               </TimelineBody>
//             </TimelineContent>
//           </TimelineItem>
//         );
//       })}
//     </Timeline>
//   );
// };

// export default TimelinePengiriman;
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { HiCurrencyDollar, HiTruck, HiCheckCircle } from "react-icons/hi";

export default function TimelinePengiriman({ status, createdAt, estimation }) {
  const steps = [
    {
      time: createdAt,
      label: "Pembayaran Diterima",
      icon: <HiCurrencyDollar />,
      description: "Pesanan Anda telah dibayar dan sedang diproses.",
    },
    {
      label: "Pesanan Dikirim",
      icon: <HiTruck />,
      description: `Pesanan sedang dalam perjalanan. Estimasi sampai: ${estimation}`,
    },
    {
      label: "Pesanan Diterima",
      icon: <HiCheckCircle />,
      description: "Pesanan telah diterima oleh pelanggan.",
    },
  ];

  const statusIndex =
    {
      paid: 0,
      shipped: 1,
      completed: 2,
    }[status] ?? 0;

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {steps.map((step, index) => {
        const isActive = index <= statusIndex;
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color={isActive ? "primary" : "grey"}>
                {step.icon}
              </TimelineDot>
              {index < steps.length - 1 && (
                <TimelineConnector sx={{ width: 0.004, height: 20 }} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <div>
                <p
                  className={
                    isActive
                      ? "text-blue-600 text-xs font-medium"
                      : "text-gray-400 text-sm"
                  }
                >
                  {step.label}
                </p>
                <div className="text-xs">{step.description}</div>
              </div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
