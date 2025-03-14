import type { NextPage } from "next";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import {
  BigCloseSvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
  LessonFastForwardStartSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
} from "~/components/Svgs";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string;
};

const lessonProblem1 = {
  type: "SELECT_MULTIPLE",
  question: "Ce que Vous Aimez (Passion)",
  subQuestion: "Quelles activités ou hobbies vous font perdre la notion du temps et vous remplissent de joie ?",
  answers: [
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#E6F4FF" />
              <path d="M34 14H14C12.9 14 12 14.9 12 16V32C12 33.1 12.9 34 14 34H34C35.1 34 36 33.1 36 32V16C36 14.9 35.1 14 34 14ZM14 32V16H22V32H14ZM34 32H24V16H34V32ZM33 21H25V19H33V21ZM33 25H25V23H33V25ZM33 29H25V27H33V29ZM21 20H15V18H21V20Z" fill="#1E88E5" />
            </svg>, 
      name: "Lecture" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFF0F0" />
              <path d="M34 18V12H22V28.28C20.84 27.47 19.33 27 17.66 27C13.93 27 11 29.93 11 33.66C11 37.4 13.93 40.33 17.66 40.33C21.4 40.33 24.33 37.4 24.33 33.66V20H32V26.28C30.84 25.47 29.33 25 27.66 25C23.93 25 21 27.93 21 31.66C21 35.4 23.93 38.33 27.66 38.33C31.4 38.33 34.33 35.4 34.33 31.66V18H34ZM17.66 38C15.26 38 13.33 36.07 13.33 33.67C13.33 31.27 15.26 29.33 17.66 29.33C20.06 29.33 21.99 31.26 21.99 33.66C21.99 36.06 20.06 38 17.66 38ZM27.66 36C25.26 36 23.33 34.07 23.33 31.67C23.33 29.27 25.26 27.33 27.66 27.33C30.06 27.33 31.99 29.26 31.99 31.66C31.99 34.06 30.06 36 27.66 36ZM32 18H24V14H32V18Z" fill="#E91E63" />
            </svg>, 
      name: "Musique" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#E8F5E9" />
              <path d="M23.84 12C17.25 12 12 17.25 12 23.84C12 30.43 17.25 35.69 23.84 35.69C30.43 35.69 35.69 30.43 35.69 23.84C35.69 17.25 30.43 12 23.84 12ZM29.46 18.92L32.5 21.96C32.87 22.58 33.15 23.27 33.31 24H28.01L29.46 18.92ZM24.42 14.41C24.92 14.41 25.41 14.46 25.88 14.54L23.84 20.3L21.8 14.54C22.27 14.46 22.76 14.41 23.26 14.41H24.42ZM15.19 24C15.34 23.27 15.62 22.58 15.99 21.96L19.03 18.92L20.49 24H15.19ZM20.49 25.69L19.03 30.77L16 27.73C15.62 27.11 15.34 26.42 15.19 25.69H20.49ZM23.26 33.27C22.76 33.27 22.27 33.22 21.8 33.15L23.84 27.38L25.88 33.15C25.41 33.22 24.92 33.27 24.42 33.27H23.26ZM28.01 25.69H33.31C33.15 26.42 32.87 27.11 32.5 27.73L29.46 30.77L28.01 25.69ZM23.84 14.38C17.89 14.38 13.07 19.2 13.07 25.15C13.07 31.1 17.89 35.92 23.84 35.92C29.8 35.92 34.61 31.1 34.61 25.15C34.61 19.2 29.8 14.38 23.84 14.38Z" fill="#4CAF50" />
            </svg>, 
      name: "Sport" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFF8E1" />
              <path d="M37 24.34L24 34V29.31L37 19.66V24.34ZM37 16L24 26L11 16V20.69L24 30.69L37 20.69V16Z" fill="#FFC107" />
            </svg>, 
      name: "Voyages" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#F3E5F5" />
              <path d="M33.81 17.07C34.73 15.99 34.52 14.35 33.42 13.47C32.8 13 31.99 12.82 31.19 13.02C30.38 13.22 29.72 13.76 29.38 14.48H29.37C29.11 15.05 29.07 15.72 29.29 16.33C29.3 16.38 29.32 16.42 29.34 16.46L16.96 29.71C16.37 30.35 16.05 31.19 16.05 32.05C16.05 32.91 16.37 33.75 16.96 34.39C17.55 35.03 18.33 35.38 19.13 35.38C19.93 35.38 20.71 35.03 21.3 34.39L33.68 21.14C33.72 21.16 33.75 21.19 33.8 21.2C35.02 21.66 36.42 21.01 36.87 19.75C37.12 19.1 37.07 18.38 36.72 17.78H36.73C36.17 16.76 34.96 16.33 33.81 17.07ZM20.01 33.25C19.35 33.94 18.28 33.94 17.62 33.25C17.29 32.9 17.11 32.44 17.11 31.95C17.11 31.47 17.29 31 17.62 30.65C18.28 29.96 19.35 29.97 20.01 30.65C20.35 31 20.52 31.47 20.52 31.95C20.52 32.44 20.35 32.9 20.01 33.25ZM30.94 19.35L20.35 30.65C19.88 30.13 19.59 29.49 19.51 28.83L28.6 19.11C28.76 19.13 28.91 19.13 29.07 19.13C29.73 19.13 30.38 18.91 30.94 18.47V19.35ZM32 17.17C31.55 17.59 30.79 17.52 30.42 17.17C30.05 16.83 30 16.04 30.42 15.62C30.84 15.2 31.55 15.24 31.92 15.62C32.29 16.01 32.42 16.76 32 17.17Z" fill="#9C27B0" />
            </svg>, 
      name: "Art/Culture" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FFEBEE" />
              <path d="M35 23.5V21H13V23.5H15V24.29C15 25.82 15.82 27.25 17.15 28.05L16 34H32L30.85 28.05C32.18 27.25 33 25.82 33 24.29V23.5H35ZM29.5 32H18.5L19.33 27.71L19.06 27.57C18.04 26.99 17.5 25.68 17.5 24.29V23.5H30.5V24.29C30.5 25.68 29.96 26.99 28.94 27.57L28.67 27.71L29.5 32ZM31.5 17H16.5V19H31.5V17Z" fill="#F44336" />
            </svg>, 
      name: "Cuisine" 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#E0F7FA" />
              <path d="M24 12C17.37 12 12 17.37 12 24C12 30.63 17.37 36 24 36C30.63 36 36 30.63 36 24C36 17.37 30.63 12 24 12ZM24 34C18.48 34 14 29.52 14 24C14 18.48 18.48 14 24 14C29.52 14 34 18.48 34 24C34 29.52 29.52 34 24 34ZM25 17H22V23H17V26H22V32H25V26H30V23H25V17Z" fill="#00BCD4" />
            </svg>, 
      name: "Autre" 
    },
  ],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6], // Toutes les réponses sont acceptables
} as const;

const lessonProblem2 = {
  type: "OPEN_ANSWER",
  question: "Activité Préférée à Temps Plein",
  subQuestion: "Si vous pouviez consacrer tout votre temps à une seule activité, laquelle choisiriez-vous et pourquoi ?",
  placeholder: "Ex. Écrire des récits, car cela me permet d&apos;exprimer mes émotions.",
  maxLength: 100,
  correctAnswer: "", // Toute réponse est correcte
} as const;

const lessonProblem3 = {
  type: "OPEN_ANSWER_WITH_SUGGESTIONS",
  question: "Expériences de Grande Satisfaction",
  subQuestion: "Quelles expériences passées vous ont procuré le plus de satisfaction et de plaisir ?",
  suggestions: ["Voyage", "Collaboration", "Projet créatif"],
  correctAnswer: "", // Toute réponse est correcte
} as const;

const lessonProblems = [lessonProblem1, lessonProblem2, lessonProblem3];

const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

const Lesson: NextPage = () => {
  const router = useRouter();

  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [otherAnswer, setOtherAnswer] = useState<string>("");
  
  // Nous avons déplacé openAnswerRef dans les composants enfants
  const startTime = useRef<number>(Date.now());
  const endTime = useRef<number | null>(null);
  
  // Réinitialiser le startTime lorsque le composant est monté
  useEffect(() => {
    startTime.current = Date.now();
    endTime.current = null;
    
    return () => {
      // Nettoyer les références si nécessaire lors du démontage
      endTime.current = null;
    };
  }, []);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  // S'assurer que nous avons un problème valide
  const problem = lessonProblem >= 0 && lessonProblem < lessonProblems.length 
    ? lessonProblems[lessonProblem] 
    : lessonProblem1;  // Fallback to the first problem if out of bounds

  const totalCorrectAnswersNeeded = 3;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts =
    "fast-forward" in router.query &&
    !isNaN(Number(router.query["fast-forward"]))
      ? 3 - incorrectAnswerCount
      : null;

  const isAnswerCorrect: boolean = React.useMemo(() => {
    // Assurons-nous que problem est défini
    if (!problem) return false;
    
    switch (problem.type) {
      case "SELECT_MULTIPLE":
        // Une sélection est toujours considérée comme correcte si au moins un élément est sélectionné
        return selectedAnswers && selectedAnswers.length > 0 ? true : false;
      case "OPEN_ANSWER":
      case "OPEN_ANSWER_WITH_SUGGESTIONS":
        // Une réponse ouverte est toujours considérée comme correcte si le champ n'est pas vide
        return openAnswer && openAnswer.trim().length > 0 ? true : false;
      default:
        return false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem, selectedAnswers, openAnswer]);

  const onCheckAnswer = () => {
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }
    // Vérifier que problem est défini avant d'accéder à ses propriétés
    if (!problem) return;
    
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse: (() => {
          switch (problem.type) {
            case "SELECT_MULTIPLE":
              return selectedAnswers && selectedAnswers.length > 0 
                ? (selectedAnswers
                    .filter(i => i >= 0 && i < problem.answers.length) // Vérifier les indices valides
                    .map(i => {
                      // Si "Autre" est sélectionné et otherAnswer est rempli, utiliser cette valeur
                      if (problem.answers[i]?.name === "Autre" && otherAnswer) {
                        return `Autre: ${otherAnswer}`;
                      }
                      return problem.answers[i]?.name ?? "";
                    })
                    .join(", "))
                : "";
            case "OPEN_ANSWER":
            case "OPEN_ANSWER_WITH_SUGGESTIONS":
              return openAnswer || "";
            default:
              return "";
          }
        })(),
        correctResponse: "Toutes les réponses sont acceptables", // Dans ce contexte, toutes les réponses sont correctes
      },
    ]);
  };

  const onFinish = () => {
    setSelectedAnswers([]);
    setOpenAnswer("");
    setOtherAnswer("");
    setCorrectAnswerShown(false);
    
    // Mettre à jour endTime uniquement à la fin d'une leçon complète
    if (correctAnswerCount + 1 >= totalCorrectAnswersNeeded) {
      endTime.current = Date.now();
    }
    
    // Passer au problème suivant, mais éviter une boucle infinie si tous les problèmes sont résolus
    if (correctAnswerCount + 1 >= totalCorrectAnswersNeeded) {
      // Ne pas passer au problème suivant si la leçon est complète
      return;
    }
    
    setLessonProblem((x) => (x + 1) % lessonProblems.length);
  };

  const onSkip = () => {
    // Réinitialiser les sélections
    setSelectedAnswers([]);
    setOpenAnswer("");
    setOtherAnswer("");
    setCorrectAnswerShown(true);
  };

  // Convertir fast-forward en nombre avec vérification
  const unitNumber = typeof router.query["fast-forward"] === 'string' 
    ? Number(router.query["fast-forward"]) 
    : 0;

  if (hearts !== null && hearts < 0 && !correctAnswerShown) {
    return (
      <LessonFastForwardEndFail
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (
    hearts !== null &&
    hearts >= 0 &&
    !correctAnswerShown &&
    correctAnswerCount >= totalCorrectAnswersNeeded
  ) {
    return (
      <LessonFastForwardEndPass
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (hearts !== null && isStartingLesson) {
    return (
      <LessonFastForwardStart
        unitNumber={unitNumber}
        setIsStartingLesson={setIsStartingLesson}
      />
    );
  }

  if (correctAnswerCount >= totalCorrectAnswersNeeded && !correctAnswerShown) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  // Vérifier que problem est défini
  if (!problem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Chargement...</h1>
      </div>
    );
  }

  switch (problem.type) {
    case "SELECT_MULTIPLE": {
      return (
        <ProblemSelectMultiple
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
          otherAnswer={otherAnswer}
          setOtherAnswer={setOtherAnswer}
        />
      );
    }

    case "OPEN_ANSWER": {
      return (
        <ProblemOpenAnswer
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
          openAnswer={openAnswer}
          setOpenAnswer={setOpenAnswer}
        />
      );
    }

    case "OPEN_ANSWER_WITH_SUGGESTIONS": {
      return (
        <ProblemOpenAnswerWithSuggestions
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
          openAnswer={openAnswer}
          setOpenAnswer={setOpenAnswer}
        />
      );
    }
    default: {
      // Cas par défaut pour éviter les erreurs de typage
      return (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Type de problème non reconnu</h1>
        </div>
      );
    }
  }
};

export default Lesson;

const ProgressBar = ({
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  setQuitMessageShown,
  hearts,
}: {
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  setQuitMessageShown: (isShown: boolean) => void;
  hearts: null | number;
}) => {
  return (
    <header className="flex items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={correctAnswerCount / totalCorrectAnswersNeeded}
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (correctAnswerCount > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>
      {hearts !== null &&
        [1, 2, 3].map((heart) => {
          if (heart <= hearts) {
            return <LessonTopBarHeart key={heart} />;
          }
          return <LessonTopBarEmptyHeart key={heart} />;
        })}
    </header>
  );
};

const QuitMessage = ({
  quitMessageShown,
  setQuitMessageShown,
}: {
  quitMessageShown: boolean;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <>
      <div
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-60 transition-all duration-300"
            : "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-0 transition-all duration-300"
        }
        onClick={() => setQuitMessageShown(false)}
        aria-label="Close quit message"
        role="button"
      ></div>

      <article
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
            : "fixed -bottom-96 left-0 right-0 z-40 flex flex-col bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
        }
        aria-hidden={!quitMessageShown}
      >
        <div className="flex grow flex-col gap-4">
          <h2 className="text-lg font-bold sm:text-2xl">
            Are you sure you want to quit?
          </h2>
          <p className="text-gray-500 sm:text-lg">
            All progress for this lesson will be lost.
          </p>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-4 sm:flex-row-reverse">
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-105 sm:w-48"
            href="/learn"
          >
            Quit
          </Link>
          <button
            className="w-full rounded-2xl py-3 font-bold uppercase text-blue-400 transition hover:brightness-90 sm:w-48 sm:border-2 sm:border-b-4 sm:border-gray-300 sm:text-gray-400 sm:hover:bg-gray-100"
            onClick={() => setQuitMessageShown(false)}
          >
            Stay
          </button>
        </div>
      </article>
    </>
  );
};

const CheckAnswer = ({
  isAnswerSelected,
  isAnswerCorrect,
  correctAnswerShown,
  correctAnswer,
  onCheckAnswer,
  onFinish,
  onSkip,
}: {
  isAnswerSelected: boolean;
  isAnswerCorrect: boolean;
  correctAnswerShown: boolean;
  correctAnswer: string;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
}) => {
  return (
    <>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={onSkip}
          >
            Skip
          </button>
          {!isAnswerSelected ? (
            <button
              className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              disabled
            >
              Check
            </button>
          ) : (
            <button
              onClick={onCheckAnswer}
              className="grow rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0"
            >
              Check
            </button>
          )}
        </div>
      </section>

      <div
        className={
          correctAnswerShown
            ? isAnswerCorrect
              ? "fixed bottom-0 left-0 right-0 bg-lime-100 font-bold text-green-600 transition-all"
              : "fixed bottom-0 left-0 right-0 bg-red-100 font-bold text-red-500 transition-all"
            : "fixed -bottom-52 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-14">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="text-2xl">Good job!</div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">Correct solution:</div>{" "}
                  <div className="text-sm font-normal">{correctAnswer}</div>
                </div>
              </div>
            )}
          </>
          <button
            onClick={onFinish}
            className={
              isAnswerCorrect
                ? "w-full rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
                : "w-full rounded-2xl border-b-4 border-red-600 bg-red-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const ProblemSelectMultiple = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswers,
  setSelectedAnswers,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
  otherAnswer,
  setOtherAnswer,
}: {
  problem: typeof lessonProblem1;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  selectedAnswers: number[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
  otherAnswer: string;
  setOtherAnswer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { question, subQuestion, answers } = problem;

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-16 sm:px-5">
          <div>
            <h1 className="self-start text-2xl font-bold sm:text-3xl">
              {question}
            </h1>
            <p className="mt-4 text-lg">{subQuestion}</p>
          </div>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            role="checkboxgroup"
          >
            {answers.map((answer, i) => {
              return (
                <div
                  key={i}
                  className={
                    selectedAnswers.includes(i)
                      ? "cursor-pointer rounded-xl border-2 border-b-4 border-blue-300 bg-blue-100 p-4 text-blue-400"
                      : "cursor-pointer rounded-xl border-2 border-b-4 border-gray-200 p-4 hover:bg-gray-100"
                  }
                  role="checkbox"
                  aria-checked={selectedAnswers.includes(i)}
                  tabIndex={0}
                  onClick={() => {
                    if (selectedAnswers.includes(i)) {
                      setSelectedAnswers(selectedAnswers.filter(idx => idx !== i));
                    } else {
                      setSelectedAnswers([...selectedAnswers, i]);
                    }
                  }}
                >
                  {answer.icon}
                  <h2 className="text-center">{answer.name}</h2>
                  {answer.name === "Autre" && selectedAnswers.includes(i) && (
                    <div className="mt-2">
                      <textarea 
                        className="w-full min-h-[60px] rounded-xl border-2 border-gray-200 p-2 text-black"
                        placeholder="Précisez..."
                        value={otherAnswer}
                        onChange={(e) => setOtherAnswer(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer="Toutes les réponses sont acceptables"
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswers.length > 0}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const ProblemOpenAnswer = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
  openAnswer,
  setOpenAnswer,
}: {
  problem: typeof lessonProblem2;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
  openAnswer: string;
  setOpenAnswer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Définir une référence locale au lieu d'utiliser celle du parent
  const openAnswerRef = useRef<HTMLTextAreaElement>(null);
  const { question, subQuestion, placeholder, maxLength } = problem;
  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-8 self-center sm:items-center sm:justify-center sm:gap-16">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {question}
            </h1>
            <p className="mt-4 text-lg">{subQuestion}</p>
          </div>

          <div className="w-full px-4">
            <textarea 
              id="openAnswerInputSimple"
              className="w-full min-h-[100px] rounded-xl border-2 border-gray-200 p-4"
              placeholder={placeholder}
              maxLength={maxLength}
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              ref={openAnswerRef}
            />
            <div className="mt-2 text-right text-gray-500">
              {openAnswer ? openAnswer.length : 0}/{maxLength}
            </div>
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer="Toutes les réponses sont acceptables"
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={openAnswer.trim().length > 0}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const ProblemOpenAnswerWithSuggestions = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
  openAnswer,
  setOpenAnswer,
}: {
  problem: typeof lessonProblem3;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
  openAnswer: string;
  setOpenAnswer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Définir une référence locale au lieu d'utiliser celle du parent
  const openAnswerRef = useRef<HTMLTextAreaElement>(null);
  const { question, subQuestion, suggestions } = problem;

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-8 self-center sm:items-center sm:justify-center sm:gap-16">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {question}
            </h1>
            <p className="mt-4 text-lg">{subQuestion}</p>
          </div>

          <div className="w-full px-4">
            <div className="relative">
              <textarea 
                id="openAnswerInputWithSuggestions"
                className="w-full min-h-[100px] rounded-xl border-2 border-gray-200 p-4"
                value={openAnswer}
                onChange={(e) => setOpenAnswer(e.target.value)}
                ref={openAnswerRef}
              />
              
              {/* Afficher toujours les suggestions */}
              <div className="mt-4">
                <p className="text-gray-500 mb-2 font-medium">Suggestions :</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      className="cursor-pointer rounded-xl border-2 border-gray-200 px-3 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setOpenAnswer(suggestion);
                        // Donner le focus au textarea après sélection
                        if (openAnswerRef.current) {
                          openAnswerRef.current.focus();
                        }
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer="Toutes les réponses sont acceptables"
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={openAnswer.trim().length > 0}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number | null>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const router = useRouter();
  const isPractice = "practice" in router.query;

  const increaseXp = useBoundStore((x) => x.increaseXp);
  const addToday = useBoundStore((x) => x.addToday);
  const increaseLingots = useBoundStore((x) => x.increaseLingots);
  const increaseLessonsCompleted = useBoundStore(
    (x) => x.increaseLessonsCompleted,
  );
  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-yellow-400">
          Lesson Complete!
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-yellow-400">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-blue-400">
            <h2 className="py-1 text-center text-white">Committed</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {formatTime(
                endTime.current !== null && startTime.current 
                  ? endTime.current - startTime.current 
                  : startTime.current 
                    ? Date.now() - startTime.current 
                    : 0
              )}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-green-400 bg-green-400">
            <h2 className="py-1 text-center text-white">Amazing</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-green-400">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                  100,
              )}
              %
            </div>
          </div>
        </div>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className={
              "flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
            href="/learn"
            onClick={() => {
              increaseXp(correctAnswerCount);
              addToday();
              increaseLingots(isPractice ? 0 : 1);
              if (!isPractice) {
                increaseLessonsCompleted();
              }
            }}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const ReviewLesson = ({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const [selectedQuestionResult, setSelectedQuestionResult] =
    useState<null | QuestionResult>(null);
  return (
    <div
      className={[
        "fixed inset-0 flex items-center justify-center p-5 transition duration-300",
        reviewLessonShown ? "" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black",
          reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setReviewLessonShown(false)}
      ></div>
      <div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8">
        <button
          className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
          onClick={() => setReviewLessonShown(false)}
        >
          <BigCloseSvg className="h-8 w-8" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-center text-3xl">Check out your scorecard!</h2>
        <p className="text-center text-xl text-gray-400">
          Click the tiles below to reveal the solutions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {questionResults.map((questionResult, i) => {
            return (
              <button
                key={i}
                className={[
                  "relative flex flex-col items-stretch gap-3 rounded-xl p-5 text-left",
                  questionResult.yourResponse === questionResult.correctResponse
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-500",
                ].join(" ")}
                onClick={() =>
                  setSelectedQuestionResult((selectedQuestionResult) =>
                    selectedQuestionResult === questionResult
                      ? null
                      : questionResult,
                  )
                }
              >
                <div className="flex justify-between gap-2">
                  <h3 className="font-bold">{questionResult.question}</h3>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                    {questionResult.yourResponse ===
                    questionResult.correctResponse ? (
                      <DoneSvg className="h-5 w-5" />
                    ) : (
                      <BigCloseSvg className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div>{questionResult.yourResponse}</div>
                {selectedQuestionResult === questionResult && (
                  <div className="absolute left-1 right-1 top-20 z-10 rounded-2xl border-2 border-gray-200 bg-white p-3 text-sm tracking-tighter">
                    <div
                      className="absolute -top-2 h-3 w-3 rotate-45 border-l-2 border-t-2 border-gray-200 bg-white"
                      style={{ left: "calc(50% - 6px)" }}
                    ></div>
                    <div className="font-bold uppercase text-gray-400">
                      Your response:
                    </div>
                    <div className="mb-3 text-gray-700">
                      {questionResult.yourResponse}
                    </div>
                    <div className="font-bold uppercase text-gray-400">
                      Correct response:
                    </div>
                    <div className="text-gray-700">
                      {questionResult.correctResponse}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LessonFastForwardStart = ({
  unitNumber,
  setIsStartingLesson,
}: {
  unitNumber: number;
  setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardStartSvg />
        <h1 className="text-lg font-bold">
          Want to jump to Unit {unitNumber}?
        </h1>
        <p className="text-sm text-gray-400">
          {`Pass the test to jump ahead. We won't make it easy for you though.`}
        </p>
      </div>
      <div className="flex flex-col gap-5"></div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/learn"
            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
          >
            Maybe later
          </Link>
          <button
            className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setIsStartingLesson(false)}
          >
            {`Let's go`}
          </button>
        </div>
      </section>
    </div>
  );
};

const LessonFastForwardEndFail = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndFailSvg />
        <h1 className="text-2xl font-bold">
          {`You didn't unlock Unit ${unitNumber}`}
        </h1>
        <p className="text-lg text-gray-500">
          {`Don't worry! Practice makes perfect.`}
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const LessonFastForwardEndPass = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const jumpToUnit = useBoundStore((x) => x.jumpToUnit);
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndPassSvg />
        <h1 className="text-2xl font-bold">You unlocked Unit {unitNumber}!</h1>
        <p className="text-lg text-gray-500">
          Way to go! You’re making great strides!
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
            onClick={() => jumpToUnit(unitNumber)}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};
