import type { Product } from '../models/product.model'

export const products: Product[] = [
  {
    id: 0,
    name: 'Hospedagem 1',
    price: 0,
    description: 'Ideal para quem está começando.',
    country: 'Estados Unidos',
    serverLoc: 'nossos data center americanos',
    tecnologies:
      'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0',
    ftpUsersLimit: 1,
    proEmailsLimit: 1,
    subdomain: 1,
    apps: ['Wordpress', 'Drupal', 'entre outros...'],
    freeMigration: false,
    extras: [
      'Webmail RoundCube',
      'AntiSpam',
      'Painel de gerenciamento de DNS',
      'Painel de controle web',
      'Configurações de PHP personalizáveis',
      'Certificado SSL Grátis',
      'Transferência ilimitada'
    ],
    mostUsed: false
  },
  {
    id: 1,
    name: 'Hospedagem 2',
    price: 499,
    paymentInterval: 'mês',
    description: 'Ideal para site com mais mais de 30k de visitas.',
    country: 'Brasil',
    serverLoc: 'São Paulo',
    tecnologies:
      'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0',
    ftpUsersLimit: 10,
    proEmailsLimit: 30,
    subdomain: 10,
    apps: ['Wordpress', 'Drupal', 'entre outros...'],
    freeMigration: true,
    extras: [
      'Webmail RoundCube',
      'AntiSpam',
      'Painel de gerenciamento de DNS',
      'Painel de controle web',
      'Configurações de PHP personalizáveis',
      'Certificado SSL Grátis',
      'Transferência ilimitada'
    ],
    mostUsed: true
  },
  {
    id: 2,
    name: 'Hospedagem 3',
    price: 999,
    paymentInterval: 'mês',
    description: 'Ideal para site com mais mais de 60k de visitas.',
    country: 'Brasil',
    serverLoc: 'São Paulo',
    tecnologies:
      'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0',
    subdomain: 50,
    apps: ['Wordpress', 'Drupal', 'entre outros...'],
    freeMigration: true,
    extras: [
      'Webmail RoundCube',
      'AntiSpam',
      'Painel de gerenciamento de DNS',
      'Painel de controle web',
      'Configurações de PHP personalizáveis',
      'Certificado SSL Grátis',
      'Transferência ilimitada'
    ],
    mostUsed: false
  }
]
