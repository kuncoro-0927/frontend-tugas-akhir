import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { Fade, accordionClasses, accordionDetailsClasses } from "@mui/material";

const AccordionFaqs = ({ title, content, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded ? title : false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <div className="accordion-container  w-[800px]">
        <Accordion
          disableGutters
          elevation={0}
          square
          expanded={expanded === title}
          onChange={handleExpansion(title)}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            {
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#fafafa", // opsional, biar lebih lembut
            },
            expanded === title
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
              expanded === title ? (
                <LuCircleMinus sx={{ fontSize: "10px" }} />
              ) : (
                <LuCirclePlus sx={{ fontSize: "10px" }} />
              )
            }
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0 }}
          >
            <span className="text-base font-bold"> {title}</span>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingX: 0 }}>
            <span className="text-sm text-graytext"> {content}</span>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default AccordionFaqs;
