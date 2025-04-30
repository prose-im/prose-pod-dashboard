/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * TYPES
 * ************************************************************************* */

export type Url = string;
/** A MIME type. */
export type Mime = string;
export type EmailAddress = string;
export type Uuid = string;
/** Warn: Should be using a type that is zeroized from memory and cannot be printed. */
export type Password = string;

export type Timestamp = string;
/** A duration in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601#Durations)
 * containing only date components (e.g. `P3D`, `P1W`…). */
export type DurationDateLike = string;

export type Hostname = string;
export type Ipv4 = string;
export type Ipv6 = string;

/** A bare JID (e.g. `alice@example.org`). */
export type BareJid = string;
/** The local part (aka “username”) of a JID (e.g. `alice` in `alice@example.org`). */
export type JidLocalPart = string;

/** A color in CSS format (e.g. `#ABABAB`). */
export type CssColor = string;
