interface Props {
  about_me_title: string;
  about_me_description: string;
}
export const AboutMeSection = ({ about_me_description, about_me_title }: Props) => {
  return (
    <section>
      <h2 className="text-header-section">{about_me_title}</h2>
      <p className="text-muted-foreground mt-4 mb-12 leading-7 tracking-wide">{about_me_description}</p>
      <hr className="text-muted-foreground" />
    </section>
  );
};
