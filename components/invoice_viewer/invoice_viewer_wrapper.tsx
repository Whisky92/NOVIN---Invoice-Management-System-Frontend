import { Suspense } from "react";
import InvoiceViewer from "./invoice_viewer";

export default function InvoiceViewerWrapper() {
    return (
        <Suspense>
            <InvoiceViewer/>
        </Suspense>
    )
}