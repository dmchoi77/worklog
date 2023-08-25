import MasterLayout from '~/components/layout/MasterLayout';
import PanelLeft from '~/components/panel/PanelLeft';
import PanelRight from '~/components/panel/PanelRight';

const DashBoard = () => {
  return (
    <MasterLayout>
      <div
        className='panel-container'
        css={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100vh - 50px)',
        }}
      >
        <PanelLeft />
        <PanelRight />
      </div>
    </MasterLayout>
  );
};

export default DashBoard;
