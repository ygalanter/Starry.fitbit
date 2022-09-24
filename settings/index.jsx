function mySettings(props) {

  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Starry Settings
          </Text>
        }
      ></Section>
      <Section title={<Text>Options</Text>}>
        <Toggle settingsKey="showBattery" label="Show battery (Moon)"  />
        <Select
          label={`Show goals`}
          settingsKey="showActivity"
          options={[
            { name: "Minutes Active", value: "activeMinutes" },
            { name: "Calories Burned", value: "calories" },
            { name: "Distance Walked", value: "distance" },
            { name: "Floors Climbed", value: "elevationGain" },
            { name: "Step Count", value: "steps" },
            { name: "Disabled", value: "disabled" },
          ]}
        />
      </Section>
      <Section title={<Text>Star color</Text>}>
        <ColorSelect
          settingsKey="starColor"
          colors={[
            { color: "darkblue" },
            { color: "navy" },
            { color: "black" },
            { color: "darkred" },
            { color: "darkslategray" },
            { color: "firebrick" },
            { color: "indigo" },
            { color: "brown" },
            { color: "darkmagenta" },
            { color: "olive" },
            { color: "darkviolet" },
            { color: "goldenrod" },

            { color: "aqua" },
            { color: "aquamarine" },
            { color: "chartreuse" },
            { color: "floralwhite" },
            { color: "gold" },
            { color: "greenyellow" },
            { color: "khaki" },
            { color: "lawngreen" },
            { color: "yellow" },
            { color: "red" },
            { color: "thistle" },
            { color: "pink" },
          ]}
        />
      </Section>

      <Section title={<Text>Vacuum color</Text>}>
        <ColorSelect
          settingsKey="vacuumColor"
          colors={[
            { color: "darkblue" },
            { color: "navy" },
            { color: "black" },
            { color: "darkred" },
            { color: "darkslategray" },
            { color: "firebrick" },
            { color: "indigo" },
            { color: "brown" },
            { color: "darkmagenta" },
            { color: "olive" },
            { color: "darkviolet" },
            { color: "goldenrod" },

            { color: "aqua" },
            { color: "aquamarine" },
            { color: "chartreuse" },
            { color: "floralwhite" },
            { color: "gold" },
            { color: "greenyellow" },
            { color: "khaki" },
            { color: "lawngreen" },
            { color: "yellow" },
            { color: "red" },
            { color: "thistle" },
            { color: "pink" },
          ]}
        />
      </Section>

      <Section
        title={
          <Text bold align="center">
            Donate!
          </Text>
        }
      >
        <Text italic>
          If you like this clockface and would like to see it further developed
          as well as other wonderful apps and faces created, please know - I run
          on coffee. It's an essential fuel for inspiration and creativity. So
          feel free to donate so I won't run out of fuel :) Thanks!
        </Text>

        <Link source="https://paypal.me/yuriygalanter">
          YURIY'S COFFEE FUND
        </Link>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
