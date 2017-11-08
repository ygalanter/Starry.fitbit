function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Starry Settings</Text>}>
      </Section>
      <Section
        title={<Text>Star color</Text>}>
        <ColorSelect
          settingsKey="starColor"
          colors={[
            {color: 'darkblue'},
            {color: 'navy'},
            {color: 'black'},
            {color: 'darkred'},
            {color: 'darkslategray'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'goldenrod'},
            
            {color: 'aqua'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},
            {color: 'floralwhite'},
            {color: 'gold'},
            {color: 'greenyellow'},
            {color: 'khaki'},
            {color: 'lawngreen'},
            {color: 'yellow'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'pink'}
          ]}
        />
      </Section>
        
      <Section
        title={<Text>Vacuum color</Text>}>
        <ColorSelect
          settingsKey="vacuumColor"
          colors={[
            {color: 'darkblue'},
            {color: 'navy'},
            {color: 'black'},
            {color: 'darkred'},
            {color: 'darkslategray'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'goldenrod'},
            
            {color: 'aqua'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},
            {color: 'floralwhite'},
            {color: 'gold'},
            {color: 'greenyellow'},
            {color: 'khaki'},
            {color: 'lawngreen'},
            {color: 'yellow'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'pink'}
                     ]}
        />
      </Section>        
    </Page>
  );
}

registerSettingsPage(mySettings);