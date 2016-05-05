import React from 'react'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

// import sections
import HeroSection from './sectionComponents/hero.jsx'
import MediaSection from './sectionComponents/media.jsx'
import TypographySection from './sectionComponents/typography.jsx'
import FromsSection from './sectionComponents/forms.jsx'
import EmbedSection from './sectionComponents/embed.jsx'
import GridSection from './sectionComponents/grid.jsx'
import DeviceSection from './sectionComponents/device.jsx'
import BreadcrumbSection from './sectionComponents/breadcrumb.jsx'
import BlockquoteSection from './sectionComponents/blockquote.jsx'
import ChipsSection from './sectionComponents/chips.jsx'
import FixedSection from './sectionComponents/fixed.jsx'
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

// import dev sections
import DamionDev from './developmentComponents/damionDev.jsx'
import KylerDev from './developmentComponents/kylerDev.jsx'
import TusharDev from './developmentComponents/tusharDev.jsx'

// FixedSection

class Sections extends React.Component{
    render () {
        return (
            <div>
                <HeroSection />
                <MediaSection />
                <TypographySection />
                <FromsSection />
                <ScrollableSection />
                <EmbedSection />
                <DeviceSection />
                <BreadcrumbSection />
                <BlockquoteSection />
                <ChipsSection />
                <FixedSection />
                <PhotosSection />
                <MenusSection />
                <GridSection />
                <ModalsSection />
                <CardsSection />
                <ListsSection />
                <ButtonsSection />
                <IconsSection />
                <MicroSection />
                <LabelSection />
                <TabsSection />
                <AlertsSection />

                <DamionDev />
                <KylerDev />
                <TusharDev />

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        		<Pod.photo src="mrRobot.jpg" lazy={true} caption="Lazy load!" hidpiData={false} />
            </div>
        )
    }
}

export default Sections
