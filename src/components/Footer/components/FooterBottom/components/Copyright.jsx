function FooterBottomCopyright() {
  const date = new Date();
  const fullYear = date.getFullYear();

  return (
    <div className=" col-xl-6">
      <p>Copyright © {fullYear} done by Diaa Sharqawi </p>
    </div>
  );
}

export default FooterBottomCopyright;
