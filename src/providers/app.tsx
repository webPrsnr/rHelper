import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Button, Spinner } from "@/components/Elements";

import style from "./Provider.module.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { AuthLoader } from "@/lib/auth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface AppProps {
  children: React.ReactNode;
}
const ErrorFallback = () => {
  return (
    <div className={style["error"]}>
      <div>
        <h2 className={style["error__title"]}>Что то пошло не так...</h2>
        <Button
          className={style["error__btn"]}
          size="md"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Перезапустить
        </Button>
      </div>
    </div>
  );
};

export const AppProvider = ({ children }: AppProps) => {
  return (
    <Suspense
      fallback={
        <div className={style["spinner__wrapper"]}>
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthLoader
            renderLoading={() => (
              <div className={style["spinner__wrapper"]}>
                <Spinner size="xl" />
              </div>
            )}
          >
            <BrowserRouter>
              <DndProvider backend={HTML5Backend}>{children}</DndProvider>
            </BrowserRouter>
          </AuthLoader>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
