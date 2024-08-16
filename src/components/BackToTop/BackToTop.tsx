import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { memo, useCallback, useEffect, useState } from 'react';

interface IProps {
  className?: string;
}

const BackToTop = ({ className = '' }: IProps) => {
  const customeClass = classNames(
    'fixed bottom-[50px] right-[50px] translate-y-[5px] transition-transform duration-300 hover:!translate-y-[-5px]',
    className,
  );

  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const handleClickScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {visible && (
        <Button
          shape="round"
          icon={<UpOutlined />}
          className={customeClass}
          onClick={handleClickScrollToTop}
        >
          <span className="font-bold">To top</span>
        </Button>
      )}
    </>
  );
};

export default memo(BackToTop);
