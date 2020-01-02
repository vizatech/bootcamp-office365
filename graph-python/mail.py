import adal
import requests

# Тенант в Microsoft 365
aad_tenant = "vitalyzhukov.com"
# Идентификатор приложения
client_id = "f9812a25-094b-48c3-b1ec-3006e93c56fd"
# Ключ для авторизации приложения без пользователя
client_secret = "uEeRIqWx2Gmc5R/2bKpmcKs/OdZ]h3O@"
# Ендпоинт авторизации
authority = "https://login.microsoftonline.com/{}".format(aad_tenant)

# Контекст авторизации
ctx = adal.AuthenticationContext(authority)

# Запрашиваем токен
token = ctx.acquire_token_with_client_credentials("https://graph.microsoft.com", client_id, client_secret)

# Заголовок для запросов к Microsoft Graph
headers = { 
    # Токен
    "Authorization" : "Bearer {0}".format(token["accessToken"]),
    # Ожидаем получить данные в формате JSON
    "Accept" : "application/json",
    # Передаем данные в формате JSON
    "Content-Type" : "application/json"
}

# Базовый URL для работы с Microsoft Graph v1.0
base_url = "https://graph.microsoft.com/v1.0"

# URL для отправки письма /users/{userPrincipalName}/sendMail
email_url = base_url + "/users/d.smith@vitalyzhukov.com/sendMail"

# Параметры отправки письма
email = {
    "message": {
        "subject": "Hello from Bootcamp", # Тема письма
        "body": {
            "contentType": "Text",
            "content": "Global Microsoft 365 Developer Bootcamp" # Текст письма
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": "vzhukov@live.ru" # Получатель
                }
            }
        ]
    },
    "saveToSentItems": "false" # Не сохранять письмо в Исходящих
}

# Отправляем письмо от имени пользователя
response = requests.post(url = email_url, headers = headers, data = str(email))
