import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IAnonymousApiProps } from './components/IAnonymousApiProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import AnonymousApi from './components/AnonymousApi';
import { IPhoto } from './IPhoto';

export default class AnonymousApiWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {

    this.context.httpClient
      // Выполняем GET-запрос
      .get('https://ms365.tech/data/photos', HttpClient.configurations.v1)
      // Полученный результат в виде JSON приводим к массиву объектов IPhoto
      .then((res: HttpClientResponse): Promise<IPhoto[]> => {
        return res.json();
      })
      // Создаем элемент и передаем в него массив фотографий
      .then((items: IPhoto[]): void => {
        const element: React.ReactElement<IAnonymousApiProps> = React.createElement(
          AnonymousApi,
          {
            items: items
          }
        );
        // Отрисовываем веб-часть
        ReactDom.render(element, this.domElement);
      });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
