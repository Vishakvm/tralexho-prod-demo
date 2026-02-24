'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function TraceContent() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const orgId = searchParams.get('org_id');
        const productId = searchParams.get('product_id');
        const traceId = searchParams.get('trace_item_id');

        let iframeUrl = '';

        if (productId && orgId) {
            iframeUrl = 'https://www.taas-trace.tralexho.com?org_id=' + encodeURIComponent(orgId)
                + '&product_id=' + encodeURIComponent(productId);
        } else if (traceId) {
            iframeUrl = 'https://www.taas-trace.tralexho.com?trace_item_id=' + encodeURIComponent(traceId);
        }

        if (iframeUrl && iframeRef.current) {
            iframeRef.current.src = iframeUrl;
        }
    }, [searchParams]);

    return (
        <div style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <iframe
                ref={iframeRef}
                width="100%"
                frameBorder="0"
                style={{ flex: 1, border: 'none' }}
            />
        </div>
    );
}

export default function Trace() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TraceContent />
        </Suspense>
    );
}
