import { Button, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import { InternalNamePath } from 'antd/es/form/interface';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
  form: FormInstance<any>;
  onFinish(values: any): void;
}

interface IErrorFields {
  name: InternalNamePath;
  errors: string[];
}

const FormComp = ({ form, children, className = '', onFinish }: IProps) => {
  const customeClass = classNames(
    'p-2.5 border-2 border-[#94CBFF] mt-5',
    className,
  );

  const handleFinishFailed = (errorFields: IErrorFields[]) => {
    if (!errorFields.length) return;

    form.scrollToField(errorFields[0].name, {
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Form
      form={form}
      className={customeClass}
      onFinish={onFinish}
      onFinishFailed={({ errorFields }) => handleFinishFailed(errorFields)}
    >
      <div className="px-[15px]">
        {children}
        <Row>
          <Button htmlType="submit">Gửi</Button>
        </Row>
      </div>
    </Form>
  );
};

export default FormComp;
