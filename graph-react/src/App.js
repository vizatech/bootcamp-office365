import React, { Component } from 'react';
import { Container, Jumbotron, Button, NavLink } from 'reactstrap';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import { GraphProvider } from './GraphProvider';
import config from './Config';
import { UserAgentApplication } from 'msal';

class App extends Component {
  constructor(props) {
    super(props);

    // Информация о приложении для авторизации
    this.graphApp = new UserAgentApplication({
      auth: {
        clientId: config.appId,
        authority: "https://login.microsoftonline.com/" + config.tenantId
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    });
    var user = this.graphApp.getAccount();
    this.state = {
      isAuthenticated: (user !== null),
      site: {},
      user: {}
    };
    if (user) {
      this.initGraphProvider();
    }
  }

  // Инициализация провайдера для работы с Microsoft Graph
  async initGraphProvider() {
    var token = await this.getToken();
    if (token) {
      this.graphProvider = new GraphProvider(token);
      this.getUser();
    }
  }

  render() {
    return (
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            loginMethod={this.login.bind(this)}
            logoutMethod={this.logout.bind(this)}
            user={this.state.user} />
          <Container>
            <Jumbotron>
              <h1>Тестирование авторизации при помощи Microsoft Graph</h1>
              {this.state.isAuthenticated == true
                ? <p>Вы авторизованы как {this.state.user.displayName}</p>
                : <p className="lead">Авторизуйтесь что получить доступ к данным</p>}

            </Jumbotron>
          </Container>
          <Container>
            <p>
              Список с данными для авторизованных внешних пользователей
                </p>
            {this.state.isAuthenticated == true
              ? <Button color="info" onClick={this.getRootSite.bind(this)}>Открыть</Button>
              : null}
          </Container>
          <Container>
            {this.state.site
              ? <NavLink href={this.state.site.webUrl}>{this.state.site.displayName}</NavLink>
              : null}
          </Container>
        </div>
    );
  }

  // Получение токена авторизации для работы с Microsoft Graph
  async getToken() {
    return await this.graphApp.acquireTokenSilent({ scopes: config.scopes });
  }

  // Вызов popup-диалогового окна для авторизации
  async login() {
    await this.graphApp.loginPopup(
      {
        scopes: config.scopes,
        prompt: "select_account"
      });
    await this.initGraphProvider();
    await this.getUser();
  }

  // Выход
  logout() {
    this.graphApp.logout();
  }

  // Получение корневого сайта SharePoint
  async getRootSite() {
    var site = await this.graphProvider.getRootSite();
    console.log(site);
    this.setState({
      site: site
    });
  }

  // Получение информации о текущем пользователе
  async getUser() {
    var user = await this.graphProvider.getUser();
    this.setState({
      isAuthenticated: true,
      user: {
        id: user.id,
        displayName: user.displayName
      }
    });
  }
}

export default App;