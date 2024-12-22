import './styles.css';
import { _$, $ } from "@vanilla-mint/core";
import { app$ } from "./app/app.component";

_$(document.body,
  app$({})
);