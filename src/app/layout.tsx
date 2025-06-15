import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: {
    default:
      "Bhoodhan Infratech - Avadh Enclave, Real Estate in Uttar Pradesh | Trusted Offerings",
    template: "%s | Bhoodhan Infratech",
  },
  description:
    "Bhoodhan Infratech offers premium real estate projects like Avadh Enclave in Uttar Pradesh. Discover trusted property offerings, transparent deals, and expert guidance for your investment in real estate.",
  alternates: {
    canonical: "https://www.bhoodhaninfratech.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="overflow-x-hidden">
        <head>
          {/* Google Analytics (replace G-XXXXXXXXXX with your real GA4 ID) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `,
            }}
          />
        </head>
        <body className="bg-background text-foreground overflow-x-hidden">
          <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}