"use client";

import InvoiceViewer from "@components/invoice_viewer/invoice_viewer";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const id = searchParams.get("invoiceId");

    return (
        <section className="home_section">
            <InvoiceViewer id={id} />
        </section>
    );
}