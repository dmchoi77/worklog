import { MasterLayout } from '~/components/templates/layout/MasterLayout';
import PanelLeft from '~/components/organisms/panel/PanelLeft';
import PanelRight from '~/components/organisms/panel/PanelRight';

const DashBoard = () => {
  return (
    <div
      className='panel-container'
      css={{
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 50px)',
      }}
    >
      {/* <PanelRight /> */}
    </div>
  );
};

export default DashBoard;
