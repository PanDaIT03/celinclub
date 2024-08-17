import { Col, Row, Image } from 'antd';
import { Rewards, RV_OPV_Logo, VN_Brand_Banner_3 } from 'assets/images';
import { useTranslation } from 'react-i18next';
import '../i18n/index';

const Banner = () => {
  const { t } = useTranslation(['home', 'form']);

  return (
    <>
      <Row className="bg-[#FFFED2]">
        <div className="flex w-full max-w-[1140px] mx-auto py-2.5">
          <Col className="flex flex-1 p-2.5 justify-center items-center">
            <h2 className="font-roboto text-3xl text-[#016088] font-semibold text-center">
              Chương trình <br />
              khách hàng Kích thước / Mystery Shopper
            </h2>
          </Col>
          <Col className="p-2.5">
            <Image preview={false} width={184} height={122} src={RV_OPV_Logo} />
          </Col>
        </div>
      </Row>
      <Row className="w-full max-w-[1140px] mx-auto py-2.5">
        <Image preview={false} src={VN_Brand_Banner_3} />
      </Row>
      <Row className="w-full max-w-[1140px] mx-auto py-2.5">
        <h2 className="w-full text-center">
          <span className="font-doppio font-semibold text-[#033A72] text-[33px]">
            {t('Submit')}
            {t('Weekly Call Reward')}
          </span>
          <br />
          <span className="font-roboto font-semibold text-[#0BA2E2] text-[28px]">
            {t('Weekly House Visit Reward')}
          </span>
        </h2>
      </Row>
      <Row className="w-full max-w-[1140px] mx-auto py-2.5">
        <Image preview={false} src={Rewards} />
      </Row>
    </>
  );
};

export default Banner;
