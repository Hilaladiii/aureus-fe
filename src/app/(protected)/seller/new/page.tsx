"use client";

import React, { useState } from "react";
import { ConsignmentForm } from "./_component/ConsignmentForm";
import { SuccessState } from "./_component/SuccessState";

export default function NewLotPage() {
  const [success, setSuccess] = useState(false);

  if (success) {
    return <SuccessState />;
  }

  return <ConsignmentForm onSuccess={() => setSuccess(true)} />;
}
