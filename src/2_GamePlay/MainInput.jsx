import "./MainInput.css"
import React, { useRef, useEffect, useState } from 'react';

export default function MainInput() {


    return (
        <input type="text" className="main-input" name="main-input" autoComplete="off" spellCheck="false" />
    )
}