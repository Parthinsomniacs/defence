import Section from "@/app/components/ui/Section";

const values = [
  "Placeholder value one",
  "Placeholder value two",
  "Placeholder value three",
];

export default function Values() {
  return (
    <Section id="values" eyebrow="How we work" title="Our principles">
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </Section>
  );
}
