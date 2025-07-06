
 function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Thank You...</h2>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Links</h2>
            <ul className="space-y-1">
              <li><a href="#home-section" className="hover:text-yellow-400">Home</a></li>
              <li><a href="#about-section" className="hover:text-yellow-400">About</a></li>
              <li><a href="#resume-section" className="hover:text-yellow-400">Resume</a></li>
              <li><a href="#project-section" className="hover:text-yellow-400">Projects</a></li>
              <li><a href="#contact-section" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Nice To Meet You</h2>
            <ul className="space-y-1">
              <li>
                <span className="material-icons align-middle mr-2">phone</span>
                414-394-5060
              </li>
              <li>
                <span className="material-icons align-middle mr-2">email</span>
                <a href="mailto:hank170305@gmail.com" className="hover:text-yellow-400">hank170305@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="/images/favicon.png" alt="logo" className="h-12" />
        </div>
      </div>
    </footer>
  );
}
export default Footer;