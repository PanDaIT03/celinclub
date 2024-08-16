import { Button, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
  form: FormInstance<any>;
  isSubmitting?: boolean;
  onFinish(values: any): void;
}

const FormComp = ({
  form,
  children,
  className = '',
  isSubmitting = false,
  onFinish,
}: IProps) => {
  const customeClass = classNames(
    'p-2.5 border-2 border-[#94CBFF] mt-5',
    className,
  );

  return (
    <Form form={form} className={customeClass} onFinish={onFinish}>
      <div className="px-[15px]">
        {children}
        <Row>
          <Button htmlType="submit" disabled={isSubmitting}>
            Gửi
          </Button>
        </Row>
      </div>
    </Form>
  );
};

export default FormComp;
