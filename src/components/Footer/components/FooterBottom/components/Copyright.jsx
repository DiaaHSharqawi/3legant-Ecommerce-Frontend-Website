function Copyright() {
  const date = new Date();
  const fullYear = date.getFullYear();

  return (
    <div className="col-sm-12 col-xl-4">
      <p>Copyright © {fullYear} done by Diaa Sharqawi </p>
    </div>
  );
}

export default Copyright;
