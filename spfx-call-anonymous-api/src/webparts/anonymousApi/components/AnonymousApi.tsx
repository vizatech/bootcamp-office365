import * as React from 'react';
import styles from './AnonymousApi.module.scss';
import { IAnonymousApiProps } from './IAnonymousApiProps';
import { Image } from 'office-ui-fabric-react/lib/Image';

export default class AnonymousApi extends React.Component<IAnonymousApiProps, {}> {
  public render(): React.ReactElement<IAnonymousApiProps> {
    return (
      <div className={ styles.anonymousApi }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {/* Перебираем массив фотографий и на основании каждого элемента массива создаем объект Image */}
              {this
                .props
                .items
                .map(
                  function(x){
                    return <Image src={x.ThumbUrl} alt={x.Event} className={ styles.image } />
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
