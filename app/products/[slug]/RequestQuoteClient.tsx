"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import RequestQuoteModal from "../../../components/RequestQuoteModal";

export default function RequestQuoteClient({ defaultProduct }: { defaultProduct: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" onClick={() => setOpen(true)}>
        Request Quotation
      </Button>
      <RequestQuoteModal 
        open={open} 
        onOpenChange={setOpen} 
        defaultProduct={defaultProduct} 
      />
    </>
  );
}
