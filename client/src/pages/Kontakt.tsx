import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export function Contact() {
  // Studio info state
  const [info, setInfo] = useState<any>(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formError, setFormError] = useState("");

  // Load studio info
  useEffect(() => {
    fetch("http://localhost:4000/studioinfo")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoadingInfo(false);
      })
      .catch(() => {
        setLoadingInfo(false);
      });
  }, []);

  // Handle contact form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("idle");
    setFormError("");

    try {
      const response = await fetch("http://localhost:4000/contactform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormStatus("success");

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setFormStatus("error");
      setFormError(err.message || "Failed to send message");
    }
  };

  if (loadingInfo) {
    return (
      <p className="text-center mt-10 text-gray-500">Laadimine...</p>
    );
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Võta ühendust
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* CONTACT INFO */}
          <div className="space-y-8">
            <h3 className="text-2xl mb-6 text-gray-800">Kontaktandmed</h3>
            <div className="space-y-4">
              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-800">Asukoht</div>
                  <p className="text-gray-600">{info.location}</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Telefon</div>
                  <p className="text-gray-600">{info.phone}</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-800">Email</div>
                  <p className="text-gray-600">{info.email}</p>
                </div>
              </div>

              {/* INSTAGRAM */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="text-gray-800">Instagram</div>
                  <a
                    href={`https://instagram.com/${info.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {info.instagram}
                  </a>
                </div>
              </div>

              {/* FACEBOOK */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-800">Facebook</div>
                  <a
                    href={`https://facebook.com/${info.facebook.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {info.facebook}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl mb-6 text-gray-800">Saada meile sõnum</h3>

              {formStatus === "success" && (
                <p className="text-green-600 mb-4">
                  Sõnum saadetud! Võtame teiega varsti ühendust.
                </p>
              )}

              {formStatus === "error" && (
                <p className="text-red-600 mb-4">
                  Viga: {formError}
                </p>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-700">
                    Nimi
                  </label>
                  <Input
                    id="name"
                    placeholder="Teie nimi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-700">
                    E-post
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="teie@email.ee"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-gray-700">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+372 5XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-700">
                    Sõnum
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Kirjutage oma küsimus või broneeringusoov..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Saada sõnum
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* HOURS */}
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-2xl mb-4 text-gray-800">Lahtiolekuajad</h3>
          <div className="text-gray-600">{info.hours}</div>
        </div>
      </div>
    </section>
  );
}
export default Contact;