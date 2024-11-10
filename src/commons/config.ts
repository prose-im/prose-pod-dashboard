/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

// @ts-expect-error __CONFIG__ is a global object injected by Vite
const CONFIG = Object.freeze(__CONFIG__);

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default CONFIG;
