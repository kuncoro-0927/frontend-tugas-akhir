import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Ikon plus
import CloseIcon from "@mui/icons-material/Close"; // Ikon x
import { Fade, accordionClasses, accordionDetailsClasses } from "@mui/material";

const AccordionTransition = () => {
  const [expanded, setExpanded] = useState("panel1"); // Default to 'panel1' open

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Only one panel can be open at a time
  };

  return (
    <>
      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "panel1"}
        onChange={handleExpansion("panel1")}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded === "panel1"
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <CloseIcon sx={{ fontSize: "17px" }} />
            ) : (
              <AddIcon sx={{ fontSize: "17px" }} />
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ padding: 0 }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Kualitas Terbaik
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingX: 0 }}>
          <p className="text-sm">
            Bingkai kami dibuat dengan bahan pilihan yang kuat dan tahan lama,
            menjaga foto Anda tetap terlindungi.
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "panel2"}
        onChange={handleExpansion("panel2")}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded === "panel2"
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <CloseIcon sx={{ fontSize: "17px" }} />
            ) : (
              <AddIcon sx={{ fontSize: "17px" }} />
            )
          }
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ padding: 0 }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Desain Elegan
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingX: 0 }}>
          <p className="text-sm">
            Dengan desain minimalis dan modern, Faza Frame mudah dipadukan
            dengan berbagai gaya interior.
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "panel3"}
        onChange={handleExpansion("panel3")}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded === "panel3"
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel3" ? (
              <CloseIcon sx={{ fontSize: "17px" }} />
            ) : (
              <AddIcon sx={{ fontSize: "17px" }} />
            )
          }
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ padding: 0 }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Harga Terjangkau
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingX: 0 }}>
          <p className="text-sm">
            Kami menawarkan kualitas tinggi dengan harga yang tetap ramah di
            kantong.
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "panel4"}
        onChange={handleExpansion("panel4")}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded === "panel4"
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel4" ? (
              <CloseIcon sx={{ fontSize: "17px" }} />
            ) : (
              <AddIcon sx={{ fontSize: "17px" }} />
            )
          }
          aria-controls="panel4-content"
          id="panel4-header"
          sx={{ padding: 0 }}
        >
          <span className="font-semibold">Pengiriman Cepat dan Aman</span>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingX: 0 }}>
          <p className="text-sm">
            Pesanan Anda akan dikemas dengan baik dan dikirim tepat waktu,
            memastikan bingkai tiba dengan kondisi sempurna.
          </p>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionTransition;
