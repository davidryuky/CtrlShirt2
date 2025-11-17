
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-press-start text-primary mb-8 text-center">Sobre a CtrlShirt</h1>
      <div className="bg-dark-card p-8 rounded-lg border border-dark-border space-y-6 text-gray-300 leading-relaxed">
        <p>
          A CtrlShirt nasceu da paixão de um grupo de gamers, desenvolvedores e amantes da cultura pop que estavam cansados de camisetas genéricas. Nós acreditamos que vestir o que você ama é uma forma de expressão, um 'equip item' para a vida real que aumenta seu carisma e mostra suas paixões.
        </p>
        <p>
          Nossa missão é simples: criar "loot" de alta qualidade. Cada estampa é pensada como um item lendário, com referências que só os verdadeiros iniciados entendem, mas com um design tão incrível que todos admiram. Usamos apenas os melhores materiais, porque sabemos que uma boa build começa com bons equipamentos.
        </p>
        <p>
          De easter eggs de jogos retrô a piadas de código que só um dev entenderia, de sagas espaciais épicas a animes que marcaram gerações - nosso catálogo é um inventário cuidadosamente selecionado para o geek moderno.
        </p>
        <p className="font-bold text-accent text-lg text-center pt-4">
          Bem-vindo à guilda. Equipe-se com CtrlShirt.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
