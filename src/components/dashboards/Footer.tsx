export default function Footer() {
  return (
    <footer className="mt-12 border-t pt-8">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div>
          <p className="font-medium text-foreground text-center lg:text-start md:text-start">
            SentiLaptop - Analisis Sentimen
          </p>
          <p>Skripsi oleh Syafrizal Wd Mahendra (E41222719)</p>
        </div>
        <div className="text-center lg:text-end md:text-end">
          <p>Politeknik Negeri Jember</p>
          <p>PSDKU Teknik Informatika Kampus 3 Nganjuk</p>
        </div>
      </div>
    </footer>
  );
}
