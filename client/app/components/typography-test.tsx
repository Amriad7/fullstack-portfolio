import { H1, H2, H3, P, List, BlockQuote } from "./ui/typography";

const TypographyTest = () => {
  return (
    <div className="p-5 space-y-8">
      <section>
        <H1>Taxing Laughter: The Joke Tax Chronicles</H1>
        <P>
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </P>
      </section>
      <section>
        <H2>The King's Plan</H2>
        <P>
          The king thought long and hard, and finally came up with a brilliant
          plan: he would tax the jokes in the kingdom.
        </P>
        <BlockQuote>
          The king's subjects were not amused. They grumbled and complained, but
          the king was firm:
        </BlockQuote>
      </section>
      <section>
        <H3>The Joke Tax</H3>
        <P>
          The king's subjects were not amused. They grumbled and complained, but
          the king was firm:
        </P>
        <List>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </List>
        <P>
          As a result, people stopped telling jokes, and the kingdom fell into a
          gloom. But there was one person who refused to let the king's
          foolishness get him down: a court jester named Jokester.
        </P>
      </section>
    </div>
  );
};

export default TypographyTest;
