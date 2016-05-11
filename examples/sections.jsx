import React from 'react'


var singleTest = false;


// import sections
/*

*/
import HeroSection from './sectionComponents/hero.jsx'
import FixedSection from './sectionComponents/fixed.jsx'
import MediaSection from './sectionComponents/media.jsx'
import TypographySection from './sectionComponents/typography.jsx'
import FromsSection from './sectionComponents/forms.jsx'
import EmbedSection from './sectionComponents/embed.jsx'
import GridSection from './sectionComponents/grid.jsx'
import DeviceSection from './sectionComponents/device.jsx'
import BreadcrumbSection from './sectionComponents/breadcrumb.jsx'
import BlockquoteSection from './sectionComponents/blockquote.jsx'
import ChipsSection from './sectionComponents/chips.jsx'
import MenusSection from './sectionComponents/menus.jsx'
import ModalsSection from './sectionComponents/modals.jsx'
import CardsSection from './sectionComponents/cards.jsx'
import ListsSection from './sectionComponents/lists.jsx'
import ButtonsSection from './sectionComponents/buttons.jsx'
import PhotosSection from './sectionComponents/photos.jsx'
import IconsSection from './sectionComponents/icons.jsx'
import MicroSection from './sectionComponents/micro.jsx'
import LabelSection from './sectionComponents/label.jsx'
import TabsSection from './sectionComponents/tabs.jsx'
import AlertsSection from './sectionComponents/alerts.jsx'
import ScrollableSection from './sectionComponents/scrollable.jsx'
import ProgressSection from './sectionComponents/progress.jsx'

// import dev sections
import DamionDev from './developmentComponents/damionDev.jsx'
import KylerDev from './developmentComponents/kylerDev.jsx'
import TusharDev from './developmentComponents/tusharDev.jsx'

// FixedSection

/*

*/

var elements = (!singleTest) ? (
    <div>
		<HeroSection />
		<FixedSection />
		<MediaSection />
		<TypographySection />
		<FromsSection />
		<EmbedSection />
		<GridSection />
		<DeviceSection />
		<BreadcrumbSection />
		<BlockquoteSection />
		<ChipsSection />
		<MenusSection />
		<ModalsSection />
		<CardsSection />
		<ListsSection />
		<ButtonsSection />
		<PhotosSection />
		<ScrollableSection />
		<IconsSection />
		<MicroSection />
		<LabelSection />
		<TabsSection />
        <AlertsSection />
        <ProgressSection />
    </div>
) : (
    <div>
        <DamionDev />
        <KylerDev />
        <TusharDev />
    </div>
);

class Sections extends React.Component {
    render () {
		return (<div>{elements}</div>)

		/*
        return (
            <div>
                {elements}

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<Pod.photo src="mrRobot.jpg" lazy={true} caption="Lazy load!" hidpiData={false} />
            </div>
        )
		*/
    }
}

export default Sections
