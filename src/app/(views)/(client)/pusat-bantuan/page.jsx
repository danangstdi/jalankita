import Navbar from "@/app/components/Navbar";

const HelpCenter = () => {
  const currentYear = new Date().getFullYear();
  const contactList = [
    {label: 'Whatsapp', value: '+62 8953557707877', icon: 'https://img.icons8.com/ios-filled/50/4caf50/whatsapp.png'},
    {label: 'Email', value: 'jalankita@gmail.com', icon: 'https://img.icons8.com/ios-filled/50/1a73e8/email.png'},
  ]

  return (
    <>
      <Navbar pageNav='Pusat Bantuan'/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-white p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg text-gray-800">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-slate-800">
            Pusat Bantuan
          </h1>
          <p className="text-center text-lg mb-6">
            Kami siap membantu Anda! Hubungi kami melalui saluran berikut:
          </p>
          <div className="space-y-4">
            {contactList.map((contact) => (
              <div className="flex items-center p-4 bg-slate-100 rounded-lg shadow-sm hover:shadow-md">
                <img
                  src={contact.icon}
                  alt={contact.label}
                  className="h-8 w-8 mr-4"
                />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <span className="text-lg font-medium">{contact.label}</span>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline md:text-base"
                >
                  {contact.value}
                </a>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      <footer className='text-center bg-slate-900 text-slate-300 py-5 text-xs md:text-sm'>
        <p className="font-semibold">MSIB Batch 7 - Dicoding Indonesia</p>
        <p className="mt-1"><strong>© {currentYear} JalanKita</strong>. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HelpCenter;