import { Button, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import { InternalNamePath } from 'antd/es/form/interface';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import '../../i18n/index';

interface IProps {
  children: ReactNode;
  className?: string;
  form: FormInstance<any>;
  isSubmitting?: boolean;
  onFinish(values: any): void;
}

interface IErrorFields {
  name: InternalNamePath;
  errors: string[];
}

interface IErrorFields {
  name: InternalNamePath;
  errors: string[];
}

const FormComp = ({
  form,
  children,
  className = '',
  isSubmitting = false,
  onFinish,
}: IProps) => {
  const { t } = useTranslation(['form', 'home']);

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
          <Button htmlType="submit" disabled={isSubmitting}>
            {t('Submit')}
          </Button>
        </Row>
      </div>
    </Form>
  );
};

export default FormComp;
