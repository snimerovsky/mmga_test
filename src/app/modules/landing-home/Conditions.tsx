import React from "react";
import { withRoute } from "react-router5";
import { Route, Router } from "router5";
import "./Rules.scss";

interface IProps {
  router: Router;
  route: Route;
}

export const RulesComp = (props: IProps) => {
  return (
    <div className="Rules-Container">
      <div className="wrapper">
        <h2>Условия</h2>
        <p>1. Общие положения Пользовательского соглашения</p>
        <p>
          1.1. В настоящем документе и вытекающих или связанным с ним отношениях
          Сторон применяются следующие термины и определения:
        </p>
        <p>
          а) Платформа — программно-аппаратные средства, интегрированные с
          Сайтом Администрации;
        </p>
        <p>
          б) Пользователь — дееспособное физическое лицо, присоединившееся к
          настоящему Соглашению в собственном интересе либо выступающее от имени
          и в интересах представляемого им юридического лица.
        </p>
        <p>
          в) Сайт Администрации/ Сайт — интернет-сайты, размещенные в домене
          ________.ru и его поддоменах.
        </p>
        <p>
          г) Сервис — комплекс услуг и лицензия, предоставляемые Пользователю с
          использованием Платформы.
        </p>
        <p>
          д) Соглашение - настоящее соглашение со всеми дополнениями и
          изменениями.
        </p>
        <p>
          1.2. Использование вами Сервиса любым способом и в любой форме в
          пределах его объявленных функциональных возможностей, включая:
          просмотр размещенных на Сайте материалов; регистрация и/или
          авторизация на Сайте, размещение или отображение на Сайте любых
          материалов, включая но не ограничиваясь такими как: тексты,
          гипертекстовые ссылки, изображения, аудио и видео- файлы, сведения
          и/или иная информация, создает договор на условиях настоящего
          Соглашения в соответствии с положениями ст.437 и 438 Гражданского
          кодекса Российской Федерации. 1.3. Воспользовавшись любой из указанных
          выше возможностей по использованию Сервиса вы подтверждаете, что: а)
          Ознакомились с условиями настоящего Соглашения в полном объеме до
          начала использования Сервиса. б) Принимаете все условия настоящего
          Соглашения в полном объеме без каких-либо изъятий и ограничений с
          вашей стороны и обязуетесь их соблюдать или прекратить использование
          Сервиса. Если вы не согласны с условиями настоящего Соглашения или не
          имеете права на заключение договора на их основе, вам следует
          незамедлительно прекратить любое использование Сервиса. в) Соглашение
          (в том числе любая из его частей) может быть изменено Администрацией
          без какого-либо специального уведомления. Новая редакция Соглашения
          вступает в силу с момента ее размещения на Сайте Администрации либо
          доведения до сведения Пользователя в иной удобной форме, если иное не
          предусмотрено новой редакцией Соглашения.{" "}
        </p>
      </div>
    </div>
  );
};

export default withRoute(({ router, route }) => (
  <RulesComp router={router} route={route} />
));
