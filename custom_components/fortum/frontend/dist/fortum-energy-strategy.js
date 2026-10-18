var or=Object.defineProperty;var ot=(n,t)=>()=>(n&&(t=n(n=0)),t);var We=(n,t)=>{for(var e in t)or(n,e,{get:t[e],enumerable:!0})};var Ce,Er,wi,U,Ae,Ct=ot(()=>{Ce=n=>typeof n=="number"&&Number.isFinite(n)?String(Math.trunc(n)):typeof n=="string"&&n.trim()||"",Er=(n,t)=>{let e=/^\d+$/.test(n.number),i=/^\d+$/.test(t.number);return e&&i?Number(n.number)-Number(t.number):e?-1:i?1:n.number.localeCompare(t.number)},wi=n=>n?.states&&typeof n.states=="object"?n.states:n&&typeof n=="object"?n:null,U=n=>{let t=wi(n);if(!t)return[];let e=new Map;return Object.entries(t).forEach(([i,r])=>{if(!i.startsWith("sensor."))return;let s=Ce(r?.attributes?.metering_point_no);if(!s)return;let o=r?.attributes?.address,a=typeof o=="string"?o.trim():"",c=e.get(s);if(!c){e.set(s,{number:s,address:a,label:a?`${a} (${s})`:s,entityIds:[i]});return}!c.address&&a&&(c.address=a,c.label=`${a} (${s})`),c.entityIds.includes(i)||(c.entityIds.push(i),c.entityIds.sort((d,u)=>d.localeCompare(u)))}),Array.from(e.values()).sort(Er)},Ae=(n,t)=>{let e=Ce(t);if(!e)return null;let i=wi(n);if(!i)return null;let r=[];return Object.entries(i).forEach(([s,o])=>{if(!s.startsWith("sensor.")||Ce(o?.attributes?.metering_point_no)!==e)return;let c=o?.attributes?.address,d=typeof c=="string"&&c.trim().length>0;r.push({entityId:s,stateObj:o,hasAddress:d})}),r.length?(r.sort((s,o)=>s.hasAddress!==o.hasAddress?s.hasAddress?-1:1:s.entityId.localeCompare(o.entityId)),{entityId:r[0].entityId,stateObj:r[0].stateObj}):null}});var Gt,Lr,Ur,Oi,Pe,$t,Li,Ui,Kt,Wt,kt=ot(()=>{Gt=n=>n&&typeof n=="object"&&!Array.isArray(n),Lr=`Valid single strategy example:

\`\`\`yaml
type: custom:fortum-energy-single
metering_point:
  number: "6094111"
  name: Home
  temperature: sensor.custom_outdoor_temp
  itemization:
    - stat: sensor.sauna_energy
      name: Sauna
\`\`\``,Ur=`Valid multipoint strategy example:

\`\`\`yaml
type: custom:fortum-energy-multipoint
metering_points:
  - number: "6094111"
    name: Home
    temperature: sensor.custom_outdoor_temp
    itemization:
      - stat: sensor.sauna_energy
        name: Sauna
\`\`\``,Oi=(n,t)=>`${n}

${t==="multipoint"?Ur:Lr}`,Pe=(n,t)=>{if(typeof n=="number"&&Number.isFinite(n))return String(Math.trunc(n));if(typeof n!="string")throw new Error(t+" must be a string.");let e=n.trim();if(!e)throw new Error(t+" must be a non-empty string.");return e},$t=(n,t)=>{if(n==null)return;if(typeof n!="string")throw new Error(t+" must be a string when provided.");return n.trim()||void 0},Li=(n,t)=>{if(!Array.isArray(n))throw new Error(t+" must be a list.");return n.map((e,i)=>{if(!Gt(e))throw new Error(`${t}[${i}] must be an object.`);let r=Pe(e.stat,`${t}[${i}].stat`),s=$t(e.name,`${t}[${i}].name`);return{stat:r,...s?{name:s}:{}}})},Ui=n=>{if(!Gt(n))throw new Error("strategy config must be an object.");let t={...n};if(Object.prototype.hasOwnProperty.call(t,"debug")&&typeof t.debug!="boolean")throw new Error("strategy.debug must be a boolean when provided.");if(t.metering_point!==void 0){if(!Gt(t.metering_point))throw new Error("strategy.metering_point must be an object when provided.");let e={...t.metering_point};e.number!==void 0&&(e.number=Pe(e.number,"strategy.metering_point.number"));let i=$t(e.name,"strategy.metering_point.name");i?e.name=i:delete e.name;let r=$t(e.temperature,"strategy.metering_point.temperature");r?e.temperature=r:delete e.temperature,Object.prototype.hasOwnProperty.call(e,"itemization")&&(e.itemization=Li(e.itemization,"strategy.metering_point.itemization")),t.metering_point=e}return t},Kt=n=>{try{return Ui(n)}catch(t){let e=t&&t.message?t.message:String(t);throw new Error(Oi(e,"single"))}},Wt=n=>{try{let t=Ui(n);if(!Array.isArray(t.metering_points)||t.metering_points.length===0)throw new Error("strategy.metering_points must be a non-empty list.");return t.metering_points=t.metering_points.map((e,i)=>{if(!Gt(e))throw new Error(`strategy.metering_points[${i}] must be an object.`);let r=Pe(e.number,`strategy.metering_points[${i}].number`),s=$t(e.name,`strategy.metering_points[${i}].name`),o=$t(e.temperature,`strategy.metering_points[${i}].temperature`);if(!Object.prototype.hasOwnProperty.call(e,"itemization"))throw new Error(`strategy.metering_points[${i}].itemization must be a list.`);return{number:r,...s?{name:s}:{},...o?{temperature:o}:{},itemization:Li(e.itemization,`strategy.metering_points[${i}].itemization`)}}),t}catch(t){let e=t&&t.message?t.message:String(t);throw new Error(Oi(e,"multipoint"))}}});var Br,gt,Bi,Hi,De=ot(()=>{Br=(n,t)=>Object.prototype.hasOwnProperty.call(n||{},t),gt=n=>(Array.isArray(n)?n:[]).map(t=>{if(!t||typeof t!="object")return null;let e=typeof t.stat=="string"?t.stat.trim():"";if(!e)return null;let i=typeof t.name=="string"?t.name.trim():"";return{stat:e,...i?{name:i}:{}}}).filter(Boolean),Bi=n=>{let t=n&&typeof n=="object"?{...n}:{},e=t.metering_point&&typeof t.metering_point=="object"?t.metering_point:{},i=typeof e.number=="string"?e.number:"",r=typeof e.name=="string"?e.name:"",s=typeof e.temperature=="string"?e.temperature:"",o=t.debug===!0,a=Br(e,"itemization"),c=Array.isArray(e.itemization)?e.itemization.map(d=>({stat:typeof d?.stat=="string"?d.stat:"",name:typeof d?.name=="string"?d.name:""})):[];return{baseConfig:t,meteringPointNumber:i,meteringPointName:r,meteringPointTemperature:s,debug:o,hasExplicitItemization:a,itemizationRows:c}},Hi=n=>{let t={...n?.baseConfig&&typeof n.baseConfig=="object"?n.baseConfig:{}},e=t.metering_point&&typeof t.metering_point=="object"?{...t.metering_point}:{},i=typeof n?.meteringPointNumber=="string"?n.meteringPointNumber.trim():"";i?e.number=i:delete e.number;let r=typeof n?.meteringPointName=="string"?n.meteringPointName.trim():"";r?e.name=r:delete e.name;let s=typeof n?.meteringPointTemperature=="string"?n.meteringPointTemperature.trim():"";return s?e.temperature=s:delete e.temperature,n?.debug===!0?t.debug=!0:delete t.debug,n?.hasExplicitItemization?e.itemization=gt(n.itemizationRows):delete e.itemization,delete t.itemization,delete t.fortum,Object.keys(e).length>0?t.metering_point=e:delete t.metering_point,t}});var Jt,Hr,Vi,qi,ji=ot(()=>{De();Jt=n=>typeof n!="string"?"":n.trim(),Hr=n=>({number:typeof n?.number=="string"||typeof n?.number=="number"?String(n.number).trim():"",name:Jt(n?.name),temperature:Jt(n?.temperature),itemizationRows:Array.isArray(n?.itemization)?n.itemization.map(t=>({stat:typeof t?.stat=="string"?t.stat:"",name:typeof t?.name=="string"?t.name:""})):[]}),Vi=n=>{let t=n&&typeof n=="object"?{...n}:{},e=Array.isArray(t.metering_points)?t.metering_points.map(Hr):[];return{baseConfig:t,debug:t.debug===!0,points:e.length?e:[{number:"",name:"",temperature:"",itemizationRows:[]}]}},qi=n=>{let t={...n?.baseConfig&&typeof n.baseConfig=="object"?n.baseConfig:{}};n?.debug===!0?t.debug=!0:delete t.debug,delete t.itemization;let e=Array.isArray(n?.points)?n.points:[];return t.metering_points=e.map(i=>{let r=typeof i?.number=="string"||typeof i?.number=="number"?String(i.number).trim():"",s=Jt(i?.name),o=Jt(i?.temperature);return{number:r,...s?{name:s}:{},...o?{temperature:o}:{},itemization:gt(i?.itemizationRows)}}),t}});var Gi={};We(Gi,{FortumEnergyMultipointStrategyEditor:()=>_t});var Vr,B,_t,Ie=ot(()=>{kt();ji();Ct();Vr=(n,t)=>{n.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))},B=n=>String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),_t=class extends HTMLElement{connectedCallback(){this._maybeEnsureStatisticPickerLoaded()}setConfig(t){if(this._state=Vi(t),this._temperatureOverrideEnabledByPoint=this._state.points.map(e=>typeof e?.temperature=="string"&&e.temperature.trim().length>0),this._error="",this._draftErrors={},this._statisticPickerAvailable=!!customElements.get("ha-statistic-picker"),this._skipNextRender){this._skipNextRender=!1;return}this.shadowRoot||this.attachShadow({mode:"open"}),this._render(),this._maybeEnsureStatisticPickerLoaded()}set hass(t){let e=this._hass;this._hass=t,this._meteringPointsChanged(e,t)&&this._render(),this._maybeEnsureStatisticPickerLoaded()}_meteringPointsChanged(t,e){return t?JSON.stringify(U(t))!==JSON.stringify(U(e)):!0}_render(){if(!this.shadowRoot||!this._state)return;let t=this._statisticPickerAvailable??!!customElements.get("ha-statistic-picker");this._ensureTemperatureOverrideFlags();let e=this._state.points.map((i,r)=>this._renderPoint(i,r,t)).join("");this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; color: var(--primary-text-color); }
        .wrapper { display: grid; gap: 16px; }
        .field { display: grid; gap: 6px; }
        .label { font-size: 14px; font-weight: 600; }
        .hint { font-size: 12px; color: var(--secondary-text-color); }
        .hint.error-hint { color: var(--error-color); }
        .input {
          width: 100%; box-sizing: border-box; border: 1px solid var(--input-border-color, var(--divider-color));
          border-radius: 10px; min-height: 40px; background: var(--card-background-color);
          color: var(--primary-text-color); padding: 8px 10px;
        }
        .name-input { min-height: 52px; }
        .row { display: flex; align-items: center; gap: 10px; }
        .checkbox { width: 18px; height: 18px; }
        .points { display: grid; gap: 14px; }
        .point {
          border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px;
          display: grid; gap: 12px;
        }
        .point-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .point-title { font-size: 14px; font-weight: 600; }
        .itemization { display: grid; gap: 10px; }
        .item-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
          gap: 8px;
          align-items: center;
        }
        .stat-picker { width: 100%; }
        .actions { display: flex; gap: 8px; flex-wrap: wrap; }
        button {
          border: 1px solid var(--divider-color); border-radius: 10px;
          background: transparent; color: var(--primary-text-color);
          min-height: 38px; padding: 0 12px; cursor: pointer;
        }
        .error {
          border-radius: 10px; border: 1px solid var(--error-color); color: var(--error-color);
          background: color-mix(in srgb, var(--error-color) 10%, transparent);
          padding: 10px; white-space: pre-wrap; font-size: 13px;
        }
        @media (max-width: 900px) {
          .item-row { grid-template-columns: minmax(0, 1fr); }
        }
      </style>
      <div class="wrapper">
        <div class="field">
          <div class="row">
            <input
              id="debug"
              class="checkbox"
              type="checkbox"
              data-field="debug"
              ${this._state.debug?"checked":""}
            />
            <label for="debug">Debug</label>
          </div>
        </div>

        <div class="points">${e}</div>

        <div class="actions">
          <button type="button" data-action="add-point">Add metering point</button>
        </div>

        ${this._error?`<div class="error">${B(this._error)}</div>`:""}
      </div>
    `,this._bindEvents()}_ensureTemperatureOverrideFlags(){let t=Array.isArray(this._state?.points)?this._state.points:[],e=Array.isArray(this._temperatureOverrideEnabledByPoint)?this._temperatureOverrideEnabledByPoint:[];this._temperatureOverrideEnabledByPoint=t.map((i,r)=>typeof e[r]=="boolean"?e[r]:typeof i?.temperature=="string"&&i.temperature.trim().length>0)}_renderPoint(t,e,i){let r=this._getMeteringPointOptions(),s=t.number||"",o=r.some(h=>h.number===s),a=s&&!o?{number:s,label:`${s} (not currently discovered)`}:null,c=this._draftErrors?.[e]||{},d=this._temperatureOverrideEnabledByPoint?.[e]===!0,u=(t.itemizationRows||[]).map((h,_)=>`
        <div class="item-row" data-point-index="${e}" data-row-index="${_}">
          ${i?`<ha-statistic-picker
                  data-field="row_stat"
                  data-point-index="${e}"
                  data-row-index="${_}"
                  class="stat-picker"
                  hide-clear-icon
                ></ha-statistic-picker>`:`<input
                  data-field="row_stat"
                  data-point-index="${e}"
                  data-row-index="${_}"
                  class="input"
                  type="text"
                  placeholder="statistic id"
                  value="${B(h?.stat||"")}"
                />`}
          <input
            data-field="row_name"
            data-point-index="${e}"
            data-row-index="${_}"
            class="input name-input"
            type="text"
            placeholder="Name (optional)"
            value="${B(h?.name||"")}"
          />
          <button type="button" data-action="remove-row" data-point-index="${e}" data-row-index="${_}">Remove</button>
        </div>`).join("");return`
      <section class="point" data-point-index="${e}">
        <div class="point-header">
          <div class="point-title">Metering point ${e+1}</div>
          <button type="button" data-action="remove-point" data-point-index="${e}">Remove point</button>
        </div>

        <div class="field">
          <label class="label" for="point-number-${e}">Metering point number</label>
          <select id="point-number-${e}" class="input" data-field="point_number" data-point-index="${e}">
            <option value="">Select metering point</option>
            ${a?`<option value="${B(a.number)}" selected>${B(a.label)}</option>`:""}
            ${r.map(h=>`<option value="${B(h.number)}" ${h.number===s?"selected":""}>${B(h.label)}</option>`).join("")}
          </select>
          ${c.number?`<div class="hint error-hint">${B(c.number)}</div>`:""}
        </div>

        <div class="field">
          <label class="label" for="point-name-${e}">Display name</label>
          <input id="point-name-${e}" class="input" data-field="point_name" data-point-index="${e}" type="text" placeholder="Name (optional)" value="${B(t?.name||"")}" />
        </div>

        <div class="field">
          <div class="row">
            <input
              id="point-override-temperature-${e}"
              class="checkbox"
              type="checkbox"
              data-field="point_override_temperature"
              data-point-index="${e}"
              ${d?"checked":""}
            />
            <label for="point-override-temperature-${e}">Override temperature source</label>
          </div>
          ${d?i?`<ha-statistic-picker
                    id="point-temperature-${e}"
                    class="stat-picker"
                    data-field="point_temperature_stat"
                    data-point-index="${e}"
                    hide-clear-icon
                  ></ha-statistic-picker>`:`<input id="point-temperature-${e}" class="input" data-field="point_temperature" data-point-index="${e}" type="text" placeholder="Temperature source" value="${B(t?.temperature||"")}" />`:""}
        </div>

        <div class="field">
          <div class="label">Itemization</div>
          ${i?"":'<div class="hint">Statistic picker is unavailable here. Enter statistic IDs manually.</div>'}
          <div class="itemization">
            ${u}
            <div class="actions">
              <button type="button" data-action="add-row" data-point-index="${e}">Add itemization row</button>
            </div>
          </div>
        </div>
      </section>
    `}_bindEvents(){this.shadowRoot&&(this.shadowRoot.querySelectorAll("[data-field]").forEach(t=>{t.addEventListener("change",e=>this._handleFieldChange(e))}),this.shadowRoot.querySelectorAll("button[data-action]").forEach(t=>{t.addEventListener("click",e=>this._handleAction(e))}),this._applyStatisticPickerProps())}_getMeteringPointOptions(){return U(this._hass).map(t=>({number:t.number,address:t.address,label:t.label}))}_buildExcludeStatistics(t,e){return(this._state?.points?.[t]?.itemizationRows||[]).map((r,s)=>s===e||typeof r?.stat!="string"?"":r.stat.trim()).filter(Boolean)}_applyStatisticPickerProps(){!this.shadowRoot||!this._state||(this.shadowRoot.querySelectorAll("ha-statistic-picker[data-field='row_stat']").forEach(t=>{if(t.allowCustomEntity=!0,t.statisticTypes="sum",t.includeUnitClass=["energy"],!t.dataset.suppressMissingEntityItem){t.dataset.suppressMissingEntityItem="1";try{typeof t._getAdditionalItems=="function"&&(t._getAdditionalItems=()=>[])}catch{}}this._hass&&(t.hass=this._hass);let e=Number(t.dataset.pointIndex),i=Number(t.dataset.rowIndex),r=this._state?.points?.[e]?.itemizationRows?.[i];t.value=r?.stat||"",t.excludeStatistics=this._buildExcludeStatistics(e,i),t.dataset.boundValueChanged||(t.dataset.boundValueChanged="1",t.addEventListener("value-changed",s=>this._handleStatisticPickerChange(s))),typeof t.requestUpdate=="function"&&t.requestUpdate()}),this.shadowRoot.querySelectorAll("ha-statistic-picker[data-field='point_temperature_stat']").forEach(t=>{if(t.allowCustomEntity=!0,t.statisticTypes="mean",t.includeUnitClass=["temperature"],!t.dataset.suppressMissingEntityItem){t.dataset.suppressMissingEntityItem="1";try{typeof t._getAdditionalItems=="function"&&(t._getAdditionalItems=()=>[])}catch{}}this._hass&&(t.hass=this._hass);let e=Number(t.dataset.pointIndex),i=this._state?.points?.[e];t.value=i?.temperature||"",t.dataset.boundValueChanged||(t.dataset.boundValueChanged="1",t.addEventListener("value-changed",r=>this._handleStatisticPickerChange(r))),typeof t.requestUpdate=="function"&&t.requestUpdate()}))}_handleStatisticPickerChange(t){let e=t.currentTarget,i=e?.dataset?.field,r=Number(e?.dataset?.pointIndex);if(!Number.isInteger(r))return;let s=this._state?.points?.[r];if(!s)return;let o=typeof t?.detail?.value=="string"?t.detail.value:"";if(this._skipNextRender=!0,i==="point_temperature_stat"){s.temperature=o,this._validateAndEmit();return}let a=Number(e?.dataset?.rowIndex);!Number.isInteger(a)||!s.itemizationRows?.[a]||(s.itemizationRows[a].stat=o,this._validateAndEmit())}_handleFieldChange(t){if(!this._state)return;let e=t.currentTarget,i=e?.dataset?.field;if(i!=="debug"&&i!=="point_override_temperature"&&(this._skipNextRender=!0),i==="debug"){this._state.debug=e.checked,this._validateAndEmit();return}let r=Number(e?.dataset?.pointIndex);if(!Number.isInteger(r)||!this._state.points[r])return;let s=this._state.points[r];if(i==="point_number"){s.number=e.value,this._validateAndEmit();return}if(i==="point_name"){s.name=e.value,this._validateAndEmit();return}if(i==="point_override_temperature"){this._temperatureOverrideEnabledByPoint[r]=e.checked,e.checked||(s.temperature=""),this._validateAndEmit();return}if(i==="point_temperature"){s.temperature=e.value,this._validateAndEmit();return}if(i==="row_stat"||i==="row_name"){let o=Number(e?.dataset?.rowIndex);if(!Number.isInteger(o)||!s.itemizationRows[o])return;s.itemizationRows[o]={...s.itemizationRows[o],[i==="row_stat"?"stat":"name"]:e.value},this._validateAndEmit()}}_handleAction(t){if(!this._state)return;let e=t.currentTarget,i=e?.dataset?.action;if(i==="add-point"){this._state.points=this._state.points.concat({number:"",name:"",temperature:"",itemizationRows:[]}),this._temperatureOverrideEnabledByPoint=(this._temperatureOverrideEnabledByPoint||[]).concat(!1),this._validateAndEmit();return}let r=Number(e?.dataset?.pointIndex);if(!(!Number.isInteger(r)||!this._state.points[r])){if(i==="remove-point"){this._state.points=this._state.points.filter((s,o)=>o!==r),this._temperatureOverrideEnabledByPoint=(this._temperatureOverrideEnabledByPoint||[]).filter((s,o)=>o!==r),this._state.points.length===0&&(this._state.points=[{number:"",name:"",temperature:"",itemizationRows:[]}],this._temperatureOverrideEnabledByPoint=[!1]),this._validateAndEmit();return}if(i==="add-row"){this._state.points[r].itemizationRows=this._state.points[r].itemizationRows.concat({stat:"",name:""}),this._validateAndEmit();return}if(i==="remove-row"){let s=Number(e?.dataset?.rowIndex);if(!Number.isInteger(s))return;this._state.points[r].itemizationRows=this._state.points[r].itemizationRows.filter((o,a)=>a!==s),this._validateAndEmit()}}}_validateAndEmit(){if(this._draftErrors=this._collectDraftErrors(),Object.keys(this._draftErrors).length){this._error="",this._skipNextRender=!1,this._render();return}try{let t=qi(this._state),e=Wt(t);this._error="",Vr(this,e)}catch(t){this._error=t&&t.message?t.message:String(t),this._skipNextRender=!1,this._render();return}this._skipNextRender||this._render()}_collectDraftErrors(){let t={};return(Array.isArray(this._state?.points)?this._state.points:[]).forEach((i,r)=>{let s={};(typeof i?.number=="string"||typeof i?.number=="number"?String(i.number).trim():"")||(s.number="Select metering point number."),Object.keys(s).length&&(t[r]=s)}),t}_maybeEnsureStatisticPickerLoaded(){if(this._statisticPickerAvailable||customElements.get("ha-statistic-picker")){this._statisticPickerAvailable=!0;return}this._ensureStatisticPickerPromise||!this._hass||!this.shadowRoot||!this.isConnected||(this._ensureStatisticPickerPromise=this._ensureStatisticPickerLoaded().finally(()=>{this._ensureStatisticPickerPromise=void 0}))}async _ensureStatisticPickerLoaded(){if(!customElements.get("ha-selector"))return;let t=document.createElement("ha-selector");t.hass=this._hass,t.selector={statistic:{}},t.style.display="none",this.shadowRoot.appendChild(t);try{await Promise.race([customElements.whenDefined("ha-statistic-picker"),new Promise(e=>window.setTimeout(e,1200))])}finally{t.remove(),this._statisticPickerAvailable=!!customElements.get("ha-statistic-picker"),this._render()}}};if(typeof customElements<"u"){let n="fortum-energy-multipoint-strategy-editor";customElements.get(n)||customElements.define(n,_t)}});var Ki={};We(Ki,{FortumEnergySingleStrategyEditor:()=>ft});var qr,j,ft,Ne=ot(()=>{kt();De();Ct();qr=(n,t)=>{n.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))},j=n=>String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),ft=class extends HTMLElement{connectedCallback(){this._maybeEnsureStatisticPickerLoaded()}setConfig(t){if(this._state=Bi(t),this._temperatureOverrideEnabled=typeof this._state.meteringPointTemperature=="string"&&this._state.meteringPointTemperature.trim().length>0,this._state.hasExplicitItemization||(this._state.itemizationRows=this._readSingleItemizationBackup()),this._error="",this._statisticPickerAvailable=!!customElements.get("ha-statistic-picker"),this._skipNextRender){this._skipNextRender=!1;return}this.shadowRoot||this.attachShadow({mode:"open"}),this._render(),this._maybeEnsureStatisticPickerLoaded()}set hass(t){let e=this._hass;this._hass=t,this._meteringPointsChanged(e,t)&&this._render(),this._maybeEnsureStatisticPickerLoaded()}_meteringPointsChanged(t,e){return t?JSON.stringify(U(t))!==JSON.stringify(U(e)):!0}get hass(){return this._hass}_render(){if(!this.shadowRoot||!this._state)return;let t=this._statisticPickerAvailable??!!customElements.get("ha-statistic-picker"),e=this._getMeteringPointOptions(),i=this._state.meteringPointNumber||"",r=e.some(c=>c.number===i),s=i&&!r?{number:i,label:`${i} (not currently discovered)`}:null,o=this._state.itemizationRows,a=this._state.hasExplicitItemization?o.map((c,d)=>`
          <div class="item-row" data-index="${d}">
            ${t?`<ha-statistic-picker
                    data-field="stat"
                    data-index="${d}"
                    class="stat-picker"
                    hide-clear-icon
                  ></ha-statistic-picker>`:`<input
                    data-field="stat"
                    data-index="${d}"
                    class="input stat"
                    type="text"
                    placeholder="statistic id"
                    value="${j(c?.stat||"")}"
                  />`}
            <input
              data-field="name"
              data-index="${d}"
              class="input name-input"
              type="text"
              placeholder="Name (optional)"
              value="${j(c?.name||"")}"
            />
            <button type="button" class="remove" data-action="remove-item" data-index="${d}">
              Remove
            </button>
          </div>`).join(""):"";this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          color: var(--primary-text-color);
        }
        .wrapper {
          display: grid;
          gap: 16px;
        }
        .field {
          display: grid;
          gap: 6px;
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-text-color);
        }
        .hint {
          font-size: 12px;
          color: var(--secondary-text-color);
        }
        .input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid var(--input-border-color, var(--divider-color));
          border-radius: 10px;
          min-height: 40px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          padding: 8px 10px;
        }
        .name-input {
          min-height: 52px;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .checkbox {
          width: 18px;
          height: 18px;
        }
        .itemization {
          display: grid;
          gap: 10px;
        }
        .mode-option {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .item-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
          gap: 8px;
          align-items: center;
        }
        .stat-picker {
          width: 100%;
        }
        .actions {
          display: flex;
        }
        button {
          border: 1px solid var(--divider-color);
          border-radius: 10px;
          background: transparent;
          color: var(--primary-text-color);
          min-height: 38px;
          padding: 0 12px;
          cursor: pointer;
        }
        .error {
          border-radius: 10px;
          border: 1px solid var(--error-color);
          color: var(--error-color);
          background: color-mix(in srgb, var(--error-color) 10%, transparent);
          padding: 10px;
          white-space: pre-wrap;
          font-size: 13px;
        }
        @media (max-width: 800px) {
          .item-row {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      </style>
      <div class="wrapper">
        <div class="field">
          <label class="label" for="metering-point">Metering point number</label>
          <select
            id="metering-point"
            class="input"
            data-field="metering_point_number"
          >
            <option value="">Auto-discover (single point only)</option>
            ${s?`<option value="${j(s.number)}" selected>${j(s.label)}</option>`:""}
            ${e.map(c=>`<option
                  value="${j(c.number)}"
                  ${c.number===i?"selected":""}
                >${j(c.label)}</option>`).join("")}
          </select>
          <div class="hint">
            Leave empty to auto-discover when exactly one Fortum metering point exists.
          </div>
        </div>

        <div class="field">
          <label class="label" for="metering-point-name">Display name</label>
          <input
            id="metering-point-name"
            class="input"
            data-field="metering_point_name"
            type="text"
            placeholder="Name (optional)"
            value="${j(this._state.meteringPointName||"")}"
          />
        </div>

        <div class="field">
          <div class="row">
            <input
              id="override-temperature"
              class="checkbox"
              type="checkbox"
              data-field="override_temperature"
              ${this._temperatureOverrideEnabled?"checked":""}
            />
            <label for="override-temperature">Override temperature source</label>
          </div>
          ${this._temperatureOverrideEnabled?t?`<ha-statistic-picker
                    id="metering-point-temperature"
                    class="stat-picker"
                    data-field="temperature_stat"
                    hide-clear-icon
                  ></ha-statistic-picker>`:`<input
                    id="metering-point-temperature"
                    class="input"
                    data-field="metering_point_temperature"
                    type="text"
                    placeholder="Temperature source"
                    value="${j(this._state.meteringPointTemperature||"")}"
                  />`:""}
        </div>

        <div class="field">
          <div class="row">
            <input
              id="debug"
              class="checkbox"
              type="checkbox"
              data-field="debug"
              ${this._state.debug?"checked":""}
            />
            <label for="debug">Debug</label>
          </div>
        </div>

        <div class="field">
          <div class="mode-option">
            <input
              id="itemization-source-energy"
              class="checkbox"
              type="radio"
              name="itemization-source"
              data-field="itemization_mode"
              data-value="energy"
              ${this._state.hasExplicitItemization?"":"checked"}
            />
            <label for="itemization-source-energy">Use Energy dashboard itemization</label>
          </div>
          ${this._state.hasExplicitItemization?"":'<div class="hint">Manage itemizations in Energy settings. <a href="/config/energy/electricity?historyBack=1">Open Energy settings</a>.</div>'}
          <div class="mode-option">
            <input
              id="itemization-source-manual"
              class="checkbox"
              type="radio"
              name="itemization-source"
              data-field="itemization_mode"
              data-value="manual"
              ${this._state.hasExplicitItemization?"checked":""}
            />
            <label for="itemization-source-manual">Specify itemizations manually</label>
          </div>
        </div>

        ${this._state.hasExplicitItemization?`<div class="itemization">
            ${t?"":'<div class="hint">Statistic picker is unavailable here. Enter statistic IDs manually.</div>'}
            ${a}
            <div class="actions">
              <button type="button" data-action="add-item">Add itemization row</button>
            </div>
          </div>`:""}

        ${this._error?`<div class="error">${j(this._error)}</div>`:""}
      </div>
    `,this._bindEvents()}_bindEvents(){this.shadowRoot&&(this.shadowRoot.querySelectorAll("[data-field]").forEach(t=>{t.addEventListener("change",e=>{this._handleFieldChange(e)})}),this._applyStatisticPickerProps(),this.shadowRoot.querySelectorAll("button[data-action]").forEach(t=>{t.addEventListener("click",e=>{this._handleAction(e)})}))}_getMeteringPointOptions(){return U(this._hass).map(t=>({number:t.number,address:t.address,label:t.label}))}_buildExcludeStatistics(t){return!this._state||!Array.isArray(this._state.itemizationRows)?[]:this._state.itemizationRows.map((e,i)=>i===t||typeof e?.stat!="string"?"":e.stat.trim()).filter(Boolean)}_applyStatisticPickerProps(){!this.shadowRoot||!this._state||(this.shadowRoot.querySelectorAll("ha-statistic-picker[data-field='stat']").forEach(t=>{if(t.allowCustomEntity=!0,t.statisticTypes="sum",t.includeUnitClass=["energy"],!t.dataset.suppressMissingEntityItem){t.dataset.suppressMissingEntityItem="1";try{typeof t._getAdditionalItems=="function"&&(t._getAdditionalItems=()=>[])}catch{}}this._hass&&(t.hass=this._hass);let e=Number(t.dataset.index),i=Number.isInteger(e)?this._state.itemizationRows[e]:void 0;t.value=i?.stat||"",t.excludeStatistics=this._buildExcludeStatistics(e),t.dataset.boundValueChanged||(t.dataset.boundValueChanged="1",t.addEventListener("value-changed",r=>{this._handleStatisticPickerChange(r)})),typeof t.requestUpdate=="function"&&t.requestUpdate()}),this.shadowRoot.querySelectorAll("ha-statistic-picker[data-field='temperature_stat']").forEach(t=>{if(t.allowCustomEntity=!0,t.statisticTypes="mean",t.includeUnitClass=["temperature"],!t.dataset.suppressMissingEntityItem){t.dataset.suppressMissingEntityItem="1";try{typeof t._getAdditionalItems=="function"&&(t._getAdditionalItems=()=>[])}catch{}}this._hass&&(t.hass=this._hass),t.value=this._state.meteringPointTemperature||"",t.dataset.boundValueChanged||(t.dataset.boundValueChanged="1",t.addEventListener("value-changed",e=>{this._handleStatisticPickerChange(e)})),typeof t.requestUpdate=="function"&&t.requestUpdate()}))}_maybeEnsureStatisticPickerLoaded(){if(this._statisticPickerAvailable||customElements.get("ha-statistic-picker")){this._statisticPickerAvailable=!0;return}this._ensureStatisticPickerPromise||!this._hass||!this.shadowRoot||!this.isConnected||(this._ensureStatisticPickerPromise=this._ensureStatisticPickerLoaded().finally(()=>{this._ensureStatisticPickerPromise=void 0}))}async _ensureStatisticPickerLoaded(){let t="ha-selector";if(!customElements.get(t))return;let e=document.createElement(t);e.hass=this._hass,e.selector={statistic:{}},e.style.display="none",this.shadowRoot.appendChild(e);try{await Promise.race([customElements.whenDefined("ha-statistic-picker"),new Promise(i=>window.setTimeout(i,1200))])}finally{e.remove(),this._statisticPickerAvailable=!!customElements.get("ha-statistic-picker"),this._render()}}_handleStatisticPickerChange(t){if(!this._state)return;this._skipNextRender=!0;let e=t.currentTarget,i=e?.dataset?.field,r=t?.detail?.value;if(i==="temperature_stat"){this._state.meteringPointTemperature=typeof r=="string"?r:"",this._validateAndEmit();return}let s=Number(e?.dataset?.index);!Number.isInteger(s)||s<0||s>=this._state.itemizationRows.length||(this._state.itemizationRows[s]={...this._state.itemizationRows[s],stat:typeof r=="string"?r:""},this._persistSingleItemizationBackup(),this._validateAndEmit())}_handleFieldChange(t){if(!this._state)return;let e=t.currentTarget,i=e?.dataset?.field;if(i!=="override_temperature"&&i!=="debug"&&i!=="itemization_mode"&&(this._skipNextRender=!0),i==="metering_point_number"){this._state.meteringPointNumber=e.value,this._validateAndEmit();return}if(i==="metering_point_name"){this._state.meteringPointName=e.value,this._validateAndEmit();return}if(i==="metering_point_temperature"){this._state.meteringPointTemperature=e.value,this._validateAndEmit();return}if(i==="override_temperature"){this._temperatureOverrideEnabled=e.checked,this._temperatureOverrideEnabled||(this._state.meteringPointTemperature=""),this._validateAndEmit();return}if(i==="debug"){this._state.debug=e.checked,this._validateAndEmit();return}if(i==="itemization_mode"){let r=e.dataset.value==="manual";if(!r&&this._state.hasExplicitItemization&&this._persistSingleItemizationBackup(),this._state.hasExplicitItemization=r,this._state.hasExplicitItemization&&this._state.itemizationRows.length===0){let s=this._readSingleItemizationBackup();this._state.itemizationRows=s.length?s:[{stat:"",name:""}]}this._validateAndEmit();return}if(i==="stat"||i==="name"){let r=Number(e.dataset.index);if(!Number.isInteger(r)||r<0||r>=this._state.itemizationRows.length)return;this._state.itemizationRows[r]={...this._state.itemizationRows[r],[i]:e.value},this._persistSingleItemizationBackup(),this._validateAndEmit()}}_handleAction(t){if(!this._state)return;let e=t.currentTarget,i=e?.dataset?.action;if(i==="add-item"){this._state.itemizationRows=this._state.itemizationRows.concat({stat:"",name:""}),this._persistSingleItemizationBackup(),this._validateAndEmit();return}if(i==="remove-item"){let r=Number(e.dataset.index);if(!Number.isInteger(r)||r<0||r>=this._state.itemizationRows.length)return;this._state.itemizationRows=this._state.itemizationRows.filter((s,o)=>o!==r),this._persistSingleItemizationBackup(),this._validateAndEmit()}}_persistSingleItemizationBackup(){if(!this._state||!this._state.hasExplicitItemization)return;let t=this._singleItemizationBackupKey();if(!t)return;let e=gt(this._state.itemizationRows);try{globalThis.localStorage?.setItem(t,JSON.stringify(e))}catch{}}_singleItemizationBackupKey(){let t=typeof globalThis?.location?.pathname=="string"?globalThis.location.pathname:"";return t?`fortum_energy_itemization_backup_single_${t}`:null}_readSingleItemizationBackup(){let t=this._singleItemizationBackupKey();if(!t)return[];try{let e=globalThis.localStorage?.getItem(t);return e?gt(JSON.parse(e)):[]}catch{return[]}}_validateAndEmit(){try{let t=Hi(this._state),e=Kt(t);this._error="",qr(this,e)}catch(t){this._error=t&&t.message?t.message:String(t),this._skipNextRender=!1,this._render();return}this._skipNextRender||this._render()}};if(typeof customElements<"u"){let n="fortum-energy-single-strategy-editor";customElements.get(n)||customElements.define(n,ft)}});var I="energy_fortum_energy_dashboard",G={energy_sources:[],device_consumption:[],device_consumption_water:[]},de="fortum-energy-range-";var Mt=async n=>{try{return await n.callWS({type:"energy/get_prefs"})||G}catch(t){if(t&&t.code==="not_found")return G;throw t}};var Xe={energy_sources:[],device_consumption:[],device_consumption_water:[]},Qe=n=>typeof n=="string"&&/^[^:]*fortum:hourly_consumption_/.test(n),at=n=>Array.isArray(n)?n.map(t=>{if(!t||typeof t!="object")return null;let e=typeof t.stat_energy_from=="string"?t.stat_energy_from.trim():"";if(!e)return null;let i=typeof t.stat_cost=="string"?t.stat_cost.trim():"";return{stat_energy_from:e,stat_cost:i||void 0}}).filter(Boolean):[],ar=n=>Array.isArray(n?.flow_from)&&n.flow_from.length?n.flow_from:[n],cr=n=>Array.isArray(n?.flow_to)&&n.flow_to.length?n.flow_to:[n],Je=n=>Qe(n)?n.replace("hourly_consumption_","hourly_price_"):null,Ye=n=>Qe(n)?n.replace("hourly_consumption_","hourly_temperature_"):null,Ze=n=>(typeof n!="string"||!n.includes("hourly_price_"),null),he=({prefs:n,info:t,overrides:e,strictOverride:i=!1})=>{let r=n||Xe,s=t||{cost_sensors:{}},o=at(e),a=Array.isArray(e),c=i?a:o.length>0,d={fromGrid:[],toGrid:[],solar:[],fromBattery:[],toBattery:[]},u={importCost:[],exportCompensation:[],price:[],temperature:[]},h=[],_=[];return c?(o.length||_.push("override_provided_but_no_valid_energy_sources"),o.forEach(p=>{d.fromGrid.push(p.stat_energy_from);let y=p.stat_cost||s.cost_sensors[p.stat_energy_from];y&&u.importCost.push(y);let x=Je(p.stat_energy_from);if(x){u.price.push(x);let b=Ze(x);b&&h.push(b)}let g=Ye(p.stat_energy_from);g&&u.temperature.push(g)})):(r.energy_sources||[]).forEach(p=>{if(p.type==="grid"){ar(p).forEach(y=>{if(!y?.stat_energy_from)return;d.fromGrid.push(y.stat_energy_from);let x=y.stat_cost||s.cost_sensors[y.stat_energy_from];x&&u.importCost.push(x);let g=Je(y.stat_energy_from);if(g){u.price.push(g);let v=Ze(g);v&&h.push(v)}let b=Ye(y.stat_energy_from);b&&u.temperature.push(b)}),cr(p).forEach(y=>{if(!y?.stat_energy_to)return;d.toGrid.push(y.stat_energy_to);let x=y.stat_compensation||y.stat_cost||s.cost_sensors[y.stat_energy_to];x&&u.exportCompensation.push(x)});return}if(p.type==="solar"&&p.stat_energy_from){d.solar.push(p.stat_energy_from);return}p.type==="battery"&&(p.stat_energy_from&&d.fromBattery.push(p.stat_energy_from),p.stat_energy_to&&d.toBattery.push(p.stat_energy_to))}),{source:c?"override":"prefs",strictOverride:!!i,hasOverrideInput:a,overridesCount:o.length,issues:_,flowIds:{fromGrid:Array.from(new Set(d.fromGrid)),toGrid:Array.from(new Set(d.toGrid)),solar:Array.from(new Set(d.solar)),fromBattery:Array.from(new Set(d.fromBattery)),toBattery:Array.from(new Set(d.toBattery))},overlayIds:{importCost:Array.from(new Set(u.importCost)),exportCompensation:Array.from(new Set(u.exportCompensation)),price:Array.from(new Set(u.price)),temperature:Array.from(new Set(u.temperature))},forecastIds:Array.from(new Set(h))}},lr={EMPTY_PREFS:Xe,normalizeEnergySourceOverrides:at,deriveEnergyRuntimeConfig:he};typeof globalThis<"u"&&(globalThis.__fortumEnergyRuntimeConfig=lr);var Rt=class extends HTMLElement{setConfig(t){this._config=t||{},this._energySourceOverrides=at(this._config.energy_sources),this.shadowRoot||this.attachShadow({mode:"open"}),this._trySubscribe(),this._render()}set hass(t){this._hassUpdateCount=(this._hassUpdateCount||0)+1;let e=this._hass?.locale?.language!==t?.locale?.language,i=this._hass?.config?.currency!==t?.config?.currency;this._hass=t,this._trySubscribe(),this._ensureLatestPrefs(),(!this._hasRendered||e||i)&&this._render()}async _ensureLatestPrefs(){if(!this._hass||this._loadingPrefs)return;let t=Date.now();if(!(this._latestPrefs&&this._lastPrefsFetch&&t-this._lastPrefsFetch<3e5)){this._loadingPrefs=!0;try{let e=await Mt(this._hass);this._latestPrefs=e,this._lastPrefsFetch=Date.now(),this._scheduleRender()}catch{}finally{this._loadingPrefs=!1}}}disconnectedCallback(){this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0)}getCardSize(){return 5}_getCollection(){let e=`_${this._config?.collection_key||I}`;return this._hass?.connection?.[e]}_trySubscribe(){let t=this._getCollection();!t||t===this._collection||!t.subscribe||(this._unsubscribe&&this._unsubscribe(),this._collection=t,this._unsubscribe=t.subscribe(e=>{this._energyData=e,this._updateCount=(this._updateCount||0)+1,this._lastUpdateAt=Date.now(),this._scheduleRender()}))}_scheduleRender(){this._renderQueued||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this._render()}))}_sumStatistic(t,e){return!e||!t||!t[e]?0:t[e].reduce((i,r)=>{let s=r?.change;return i+(typeof s=="number"?s:0)},0)}_sumStatisticsByTimestamp(t,e){let i={},r=0;return e.forEach(s=>{let o=t[s];o&&o.forEach(a=>{if(a.change===null||a.change===void 0)return;let c=a.change;r+=c,i[a.start]=(i[a.start]||0)+c})}),{totals:i,sum:r}}_getGridImportFlows(t){return Array.isArray(t.flow_from)&&t.flow_from.length?t.flow_from:[t]}_getGridExportFlows(t){return Array.isArray(t.flow_to)&&t.flow_to.length?t.flow_to:[t]}_computeConsumptionSingle(t){let e=Math.max(t.to_grid||0,0),i=Math.max(t.to_battery||0,0),r=Math.max(t.solar||0,0),s=Math.max(t.from_grid||0,0),o=Math.max(t.from_battery||0,0),a=s+r+o-e-i,c=Math.max(a,0),d=Math.max(0,Math.min(i,s-c));i-=d,s-=d;let u=Math.min(r,i);i-=u,r-=u;let h=Math.min(r,e);e-=h,r-=h;let _=Math.min(o,e);o-=_,e-=_;let p=Math.min(s,i);s-=p;let y=Math.min(c,r);c-=y;let x=Math.min(o,c);c-=x;let g=Math.min(c,s);return{used_total:a,used_grid:g,used_solar:y,used_battery:x}}_computeTotalConsumptionFromEnergyModel(t,e){let i=[],r=[],s=[],o=[],a=[];this._energySourceOverrides.length&&this._energySourceOverrides.forEach(x=>{i.push(x.stat_energy_from)}),t.energy_sources.forEach(x=>{if(x.type==="grid"){this._energySourceOverrides.length||this._getGridImportFlows(x).forEach(g=>{g.stat_energy_from&&i.push(g.stat_energy_from)}),this._getGridExportFlows(x).forEach(g=>{g.stat_energy_to&&r.push(g.stat_energy_to)});return}if(x.type==="solar"){s.push(x.stat_energy_from);return}x.type==="battery"&&(a.push(x.stat_energy_from),o.push(x.stat_energy_to))});let c=this._sumStatisticsByTimestamp(e,i).totals,d=this._sumStatisticsByTimestamp(e,r).totals,u=this._sumStatisticsByTimestamp(e,s).totals,h=this._sumStatisticsByTimestamp(e,a).totals,_=this._sumStatisticsByTimestamp(e,o).totals,p=new Set([...Object.keys(c),...Object.keys(d),...Object.keys(u),...Object.keys(h),...Object.keys(_)]),y=0;return p.forEach(x=>{let g=Number(x),b=this._computeConsumptionSingle({from_grid:c[g]||0,to_grid:d[g]||0,solar:u[g]||0,from_battery:h[g]||0,to_battery:_[g]||0});y+=b.used_total||0}),Math.max(0,y)}_computeTotals(t){let e=t.stats||{},i=this._latestPrefs||t.prefs||G,r=t.info||{cost_sensors:{}},s=(i.energy_sources||[]).filter(m=>m.type==="grid"),o=0,a=0,c=0,d=0,u=0,h=0,_=0,p={gridFromIds:[],gridToIds:[],costImportIds:[],costExportIds:[],statKeys:Object.keys(e).length,prefsEnergySources:(t.prefs?.energy_sources||[]).length,activePrefsEnergySources:i.energy_sources.length,prefsTypes:(t.prefs?.energy_sources||[]).map(m=>m.type),activePrefsTypes:i.energy_sources.map(m=>m.type),firstCollectionSource:t.prefs?.energy_sources?.[0]||null,firstActiveSource:i.energy_sources?.[0]||null};this._energySourceOverrides.length?this._energySourceOverrides.forEach(m=>{p.gridFromIds.push(m.stat_energy_from),o+=this._sumStatistic(e,m.stat_energy_from);let w=m.stat_cost||r.cost_sensors[m.stat_energy_from];w&&p.costImportIds.push(w),h+=this._sumStatistic(e,w)}):s.forEach(m=>{this._getGridImportFlows(m).forEach(w=>{if(!w.stat_energy_from)return;p.gridFromIds.push(w.stat_energy_from),o+=this._sumStatistic(e,w.stat_energy_from);let S=w.stat_cost||r.cost_sensors[w.stat_energy_from];S&&p.costImportIds.push(S),h+=this._sumStatistic(e,S)})}),s.forEach(m=>{this._getGridExportFlows(m).forEach(w=>{if(!w.stat_energy_to)return;p.gridToIds.push(w.stat_energy_to),a+=this._sumStatistic(e,w.stat_energy_to);let S=w.stat_compensation||w.stat_cost||r.cost_sensors[w.stat_energy_to];S&&p.costExportIds.push(S),_+=this._sumStatistic(e,S)})});for(let m of i.energy_sources)if(m.type!=="grid"){if(m.type==="solar"){c+=this._sumStatistic(e,m.stat_energy_from);continue}m.type==="battery"&&(d+=this._sumStatistic(e,m.stat_energy_from),u+=this._sumStatistic(e,m.stat_energy_to))}let y=this._computeTotalConsumptionFromEnergyModel(i,e),x=h-_,g=i.device_consumption.map(m=>({name:m.name||m.stat,consumption:this._sumStatistic(e,m.stat)})),b=g.reduce((m,w)=>m+w.consumption,0),v=Math.max(0,y-b),E=y>0?x/y:0;return{totalConsumption:y,totalCost:x,devices:g.map(m=>({...m,cost:m.consumption*E})),unspecifiedConsumption:v,unspecifiedCost:v*E,__debug:{...p,hassUpdateCount:this._hassUpdateCount||0,renderCount:this._renderCount||0,updateCount:this._updateCount||0,lastUpdateAt:this._lastUpdateAt||0,fromGrid:o,toGrid:a,solar:c,fromBattery:d,toBattery:u,importCost:h,exportCompensation:_}}}_formatEnergy(t){let e=this._hass?.locale?.language||"en";return`${new Intl.NumberFormat(e,{maximumFractionDigits:2}).format(t)} kWh`}_formatCost(t){let e=this._hass?.locale?.language||"en";return new Intl.NumberFormat(e,{style:"currency",currency:this._hass.config.currency||"EUR",maximumFractionDigits:2}).format(t)}_render(){if(!this.shadowRoot)return;if(!this._hass){this.shadowRoot.innerHTML="";return}let t=this._energyData||this._getCollection()?.state;if(!t||!t.prefs||!t.stats){this.shadowRoot.innerHTML=`
        <style>
          :host { display: block; }
          .content { padding: 16px; color: var(--secondary-text-color); }
        </style>
        <ha-card><div class="content">Loading...</div></ha-card>
      `;return}try{this._renderCount=(this._renderCount||0)+1;let e=this._computeTotals(t),r=[{name:"Total",consumption:e.totalConsumption,cost:e.totalCost,bold:!0},...e.devices.map(s=>({name:s.name,consumption:s.consumption,cost:s.cost})),{name:"Unspecified",consumption:e.unspecifiedConsumption,cost:e.unspecifiedCost}].map(s=>`
          <tr class="${s.bold?"bold":""}">
            <td>${s.name}</td>
            <td class="num">${this._formatEnergy(s.consumption)}</td>
            <td class="num">${this._formatCost(s.cost)}</td>
          </tr>
        `).join("");this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          height: 100%;
          user-select: text;
          -webkit-user-select: text;
        }
        ha-card {
          height: 100%;
        }
        .wrap {
          padding: 12px 16px 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--ha-font-size-s);
        }
        th,
        td {
          padding: 8px 0;
          border-bottom: 1px solid var(--divider-color);
          user-select: text;
          -webkit-user-select: text;
        }
        th {
          text-align: left;
          color: var(--secondary-text-color);
          font-weight: var(--ha-font-weight-medium);
        }
        .num {
          text-align: right;
          white-space: nowrap;
        }
        tr.bold td {
          font-weight: var(--ha-font-weight-medium);
        }
      </style>
      <ha-card>
        <div class="wrap">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="num">Consumption</th>
                <th class="num">Cost</th>
              </tr>
            </thead>
            <tbody>${r}</tbody>
          </table>
        </div>
      </ha-card>
    `,this._hasRendered=!0}catch(e){console.error("[fortum-energy] custom legend render failed",e),this.shadowRoot.innerHTML=`
        <ha-card>
          <div style="padding:12px;color:var(--error-color);">Custom legend failed to render</div>
        </ha-card>
      `}}};var zt=globalThis,Ot=zt.ShadowRoot&&(zt.ShadyCSS===void 0||zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ei=Symbol(),ti=new WeakMap,Ft=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ei)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ot&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ti.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ti.set(e,t))}return t}toString(){return this.cssText}},ii=n=>new Ft(typeof n=="string"?n:n+"",void 0,ei);var ri=(n,t)=>{if(Ot)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=zt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,n.appendChild(i)}},ue=Ot?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ii(e)})(n):n;var{is:dr,defineProperty:hr,getOwnPropertyDescriptor:ur,getOwnPropertyNames:mr,getOwnPropertySymbols:pr,getPrototypeOf:gr}=Object,Lt=globalThis,si=Lt.trustedTypes,_r=si?si.emptyScript:"",fr=Lt.reactiveElementPolyfillSupport,bt=(n,t)=>n,me={toAttribute(n,t){switch(t){case Boolean:n=n?_r:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},oi=(n,t)=>!dr(n,t),ni={attribute:!0,type:String,converter:me,reflect:!1,useDefault:!1,hasChanged:oi};Symbol.metadata??=Symbol("metadata"),Lt.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ni){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&hr(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:s}=ur(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let a=r?.call(this);s?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ni}static _$Ei(){if(this.hasOwnProperty(bt("elementProperties")))return;let t=gr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(bt("properties"))){let e=this.properties,i=[...mr(e),...pr(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(ue(r))}else t!==void 0&&e.push(ue(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ri(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:me).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let s=i.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:me;this._$Em=r;let a=o.fromAttribute(e,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(t!==void 0){let o=this.constructor;if(r===!1&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??oi)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,s]of i){let{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[bt("elementProperties")]=new Map,V[bt("finalized")]=new Map,fr?.({ReactiveElement:V}),(Lt.reactiveElementVersions??=[]).push("2.1.2");var ve=globalThis,ai=n=>n,Ut=ve.trustedTypes,ci=Ut?Ut.createPolicy("lit-html",{createHTML:n=>n}):void 0,pi="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,gi="?"+K,yr=`<${gi}>`,Q=document,wt=()=>Q.createComment(""),St=n=>n===null||typeof n!="object"&&typeof n!="function",we=Array.isArray,br=n=>we(n)||typeof n?.[Symbol.iterator]=="function",pe=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,li=/-->/g,di=/>/g,Z=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hi=/'/g,ui=/"/g,_i=/^(?:script|style|textarea|title)$/i,Se=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),q=Se(1),fs=Se(2),ys=Se(3),tt=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),mi=new WeakMap,X=Q.createTreeWalker(Q,129);function fi(n,t){if(!we(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ci!==void 0?ci.createHTML(t):t}var vr=(n,t)=>{let e=n.length-1,i=[],r,s=t===2?"<svg>":t===3?"<math>":"",o=vt;for(let a=0;a<e;a++){let c=n[a],d,u,h=-1,_=0;for(;_<c.length&&(o.lastIndex=_,u=o.exec(c),u!==null);)_=o.lastIndex,o===vt?u[1]==="!--"?o=li:u[1]!==void 0?o=di:u[2]!==void 0?(_i.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=Z):u[3]!==void 0&&(o=Z):o===Z?u[0]===">"?(o=r??vt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?Z:u[3]==='"'?ui:hi):o===ui||o===hi?o=Z:o===li||o===di?o=vt:(o=Z,r=void 0);let p=o===Z&&n[a+1].startsWith("/>")?" ":"";s+=o===vt?c+yr:h>=0?(i.push(d),c.slice(0,h)+pi+c.slice(h)+K+p):c+K+(h===-2?a:p)}return[fi(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},xt=class n{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0,a=t.length-1,c=this.parts,[d,u]=vr(t,e);if(this.el=n.createElement(d,i),X.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=X.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(pi)){let _=u[o++],p=r.getAttribute(h).split(K),y=/([.?@])?(.*)/.exec(_);c.push({type:1,index:s,name:y[2],strings:p,ctor:y[1]==="."?_e:y[1]==="?"?fe:y[1]==="@"?ye:lt}),r.removeAttribute(h)}else h.startsWith(K)&&(c.push({type:6,index:s}),r.removeAttribute(h));if(_i.test(r.tagName)){let h=r.textContent.split(K),_=h.length-1;if(_>0){r.textContent=Ut?Ut.emptyScript:"";for(let p=0;p<_;p++)r.append(h[p],wt()),X.nextNode(),c.push({type:2,index:++s});r.append(h[_],wt())}}}else if(r.nodeType===8)if(r.data===gi)c.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(K,h+1))!==-1;)c.push({type:7,index:s}),h+=K.length-1}s++}}static createElement(t,e){let i=Q.createElement("template");return i.innerHTML=t,i}};function ct(n,t,e=n,i){if(t===tt)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,s=St(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=ct(n,r._$AS(n,t.values),r,i)),t}var ge=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??Q).importNode(e,!0);X.currentNode=r;let s=X.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new Et(s,s.nextSibling,this,t):c.type===1?d=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(d=new be(s,this,t)),this._$AV.push(d),c=i[++a]}o!==c?.index&&(s=X.nextNode(),o++)}return X.currentNode=Q,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Et=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ct(this,t,e),St(t)?t===P||t==null||t===""?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==tt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):br(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==P&&St(this._$AH)?this._$AA.nextSibling.data=t:this.T(Q.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=xt.createElement(fi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let s=new ge(r,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(t){let e=mi.get(t.strings);return e===void 0&&mi.set(t.strings,e=new xt(t)),e}k(t){we(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let s of t)r===e.length?e.push(i=new n(this.O(wt()),this.O(wt()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ai(t).nextSibling;ai(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},lt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}_$AI(t,e=this,i,r){let s=this.strings,o=!1;if(s===void 0)t=ct(this,t,e,0),o=!St(t)||t!==this._$AH&&t!==tt,o&&(this._$AH=t);else{let a=t,c,d;for(t=s[0],c=0;c<s.length-1;c++)d=ct(this,a[i+c],e,c),d===tt&&(d=this._$AH[c]),o||=!St(d)||d!==this._$AH[c],d===P?t=P:t!==P&&(t+=(d??"")+s[c+1]),this._$AH[c]=d}o&&!r&&this.j(t)}j(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},_e=class extends lt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===P?void 0:t}},fe=class extends lt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==P)}},ye=class extends lt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=ct(this,t,e,0)??P)===tt)return;let i=this._$AH,r=t===P&&i!==P||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==P&&(i===P||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},be=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ct(this,t)}};var wr=ve.litHtmlPolyfillSupport;wr?.(xt,Et),(ve.litHtmlVersions??=[]).push("3.3.3");var yi=(n,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let s=e?.renderBefore??null;i._$litPart$=r=new Et(t.insertBefore(wt(),s),s,void 0,e??{})}return r._$AI(n),r};var xe=globalThis,dt=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yi(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}};dt._$litElement$=!0,dt.finalized=!0,xe.litElementHydrateSupport?.({LitElement:dt});var Sr=xe.litElementPolyfillSupport;Sr?.({LitElement:dt});(xe.litElementVersions??=[]).push("4.2.2");var Ee=(n,t,e)=>n.localize?.(t)||e,ht=(n,t=6,e=2)=>{let i=(n||[]).filter(d=>Number.isFinite(d));if(!i.length)return 0;let r=Math.min(...i),s=Math.max(...i),o=s-r;if(o<=0)return Math.abs(s)>0&&Math.abs(s)<1?e:0;let a=o/Math.max(1,t-1);if(!Number.isFinite(a)||a<=0)return 0;let c=Math.ceil(-Math.log10(a));return Math.max(0,Math.min(e,c))},bi=(n,t)=>{let e=/^fortum:price_forecast_([a-z0-9_]+)$/i.exec(n||"");return e?`Price [${String(e[1]||"").toUpperCase()}]`:t===0?"Price":`Price ${t+1}`},ut=(n,t)=>{if(!n||!t)return!1;let e=s=>String(s).split(".").map(o=>parseInt(o,10)||0),i=e(n),r=e(t);for(let s=0;s<Math.max(i.length,r.length);s++){let o=i[s]||0,a=r[s]||0;if(o>a)return!0;if(o<a)return!1}return!0};var xr=n=>typeof n=="string"&&/^[^:]*fortum:hourly_consumption_/.test(n),Bt=class extends HTMLElement{setConfig(t){this._config=t||{},this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: block;
            height: 100%;
          }
          .container {
            height: 100%;
          }
        </style>
        <div class="container"></div>
      `),this._ensureInnerCard()}set hass(t){this._hass=t,this._ensureInnerCard(),this._innerCard&&(this._innerCard.hass=t),this._subscribeCollection(),this._overlayInitialized||(this._overlayInitialized=!0,this._scheduleOverlayApply())}disconnectedCallback(){this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0)}getCardSize(){return 3}_ensureInnerCard(){if(!this.shadowRoot||this._innerCard)return;let t=this.shadowRoot.querySelector(".container");t&&(this._innerCard=document.createElement("hui-card"),this._innerCard.config={...this._config,type:"energy-devices-detail-graph"},this._hass&&(this._innerCard.hass=this._hass),t.appendChild(this._innerCard))}_subscribeCollection(){let t=this._config?.collection_key||I,e=this._hass?.connection?.[`_${t}`];!e||e===this._collection||!e.subscribe||(this._unsubscribe&&this._unsubscribe(),this._collection=e,this._unsubscribe=e.subscribe(i=>{this._energyData=i,this._scheduleOverlayApply()}))}_scheduleOverlayApply(){this._overlayScheduled||(this._overlayScheduled=!0,requestAnimationFrame(()=>{this._overlayScheduled=!1,this._applyCostOverlay()}))}_collectCostByTimestamp(t){let e={},i=t?.prefs||G,r=t?.stats||{},s=t?.statsMetadata||{},o=t?.info||{cost_sensors:{}},a=new Set,c=(d,u=1)=>{!d||!r[d]||(a.add(d),r[d].forEach(h=>{h.change===null||h.change===void 0||(e[h.start]=(e[h.start]||0)+h.change*u)}))};i.energy_sources.forEach(d=>{if(d.type!=="grid")return;(Array.isArray(d.flow_from)?d.flow_from:[d]).forEach(_=>{if(!_.stat_energy_from)return;let p=_.stat_cost||o.cost_sensors[_.stat_energy_from];c(p,1)}),(Array.isArray(d.flow_to)?d.flow_to:[d]).forEach(_=>{if(!_.stat_energy_to)return;let p=_.stat_compensation||_.stat_cost||o.cost_sensors[_.stat_energy_to];c(p,-1)})});for(let d of a){let u=s?.[d]?.statistics_unit_of_measurement;if(u){this._costUnit=u;break}}return Object.keys(e).map(d=>[Number(d),e[d]]).sort((d,u)=>d[0]-u[0])}_toFortumPriceStatId(t){return xr(t)?t.replace("hourly_consumption_","hourly_price_"):null}_getStatsTimeBounds(t){let e=t?.start instanceof Date?t.start.getTime():NaN,i=t?.end instanceof Date?t.end.getTime():NaN;return Number.isFinite(e)&&Number.isFinite(i)&&i>e?{start:e,end:i}:Number.isFinite(e)?{start:e,end:Date.now()}:null}_normalizeExternalStats(t){return Array.isArray(t)?t.map(e=>{let i=e?.start,r=e?.end,s=typeof i=="number"?i:typeof i=="string"?Date.parse(i):NaN,o=typeof r=="number"?r:typeof r=="string"?Date.parse(r):NaN;if(!Number.isFinite(s))return null;let a=c=>c==null?null:Number(c);return{start:s,end:Number.isFinite(o)?o:s,change:a(e?.change),sum:a(e?.sum),mean:a(e?.mean),min:a(e?.min),max:a(e?.max),state:a(e?.state),last_reset:a(e?.last_reset)}}).filter(Boolean).sort((e,i)=>e.start-i.start):[]}_collectDetailStatIds(t){return Object.keys(t?.stats||{}).filter(Boolean)}_ensureExternalDetailStats(t,e){if(!this._hass||!t)return;let i=this._getStatsTimeBounds(t);if(!i)return;let r=this._collectDetailStatIds(t);if(!r.length)return;let s=[...new Set(r)].sort(),o=`${i.start}:${i.end}:${s.join("|")}`;this._externalDetailRangeKey!==o&&(this._externalDetailRangeKey=o,this._externalDetailStats={},this._externalDetailInflight=new Set),this._externalDetailInflight||(this._externalDetailInflight=new Set);let a=s.filter(c=>!this._externalDetailStats?.[c]&&!this._externalDetailInflight?.has(c));a.length&&(a.forEach(c=>this._externalDetailInflight.add(c)),this._hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(i.start).toISOString(),end_time:new Date(i.end).toISOString(),statistic_ids:a,period:"hour",types:["change","sum","state","mean","min","max","last_reset"]}).then(c=>{if(this._externalDetailRangeKey!==o)return;let d={...this._externalDetailStats||{}};a.forEach(u=>{d[u]=this._normalizeExternalStats(c?.[u])}),this._externalDetailStats=d,typeof e=="function"&&e()}).catch(c=>{console.warn("[fortum-energy] detail statistics fetch failed",c)}).finally(()=>{a.forEach(c=>this._externalDetailInflight.delete(c))}))}_withHourlyDetailStats(t,e){return!t||(this._ensureExternalDetailStats(t,e),!this._externalDetailStats||!Object.keys(this._externalDetailStats).length)?t:{...t,stats:{...t.stats||{},...this._externalDetailStats}}}_normalizeExternalPriceSeries(t){return Array.isArray(t)?t.map(e=>{let i=e?.start,r=typeof i=="number"?i:typeof i=="string"?Date.parse(i):NaN,s=e?.mean!==void 0&&e?.mean!==null?Number(e.mean):e?.state!==void 0&&e?.state!==null?Number(e.state):null;return!Number.isFinite(r)||!Number.isFinite(s)?null:{start:r,change:s}}).filter(Boolean).sort((e,i)=>e.start-i.start):[]}_ensureExternalPriceMetadata(t){if(!this._hass||!t.length)return;this._externalPriceMeta||(this._externalPriceMeta={}),this._externalPriceMetaInflight||(this._externalPriceMetaInflight=new Set);let e=t.filter(i=>i&&!this._externalPriceMeta?.[i]&&!this._externalPriceMetaInflight?.has(i));e.length&&(e.forEach(i=>this._externalPriceMetaInflight.add(i)),this._hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e}).then(i=>{let r={...this._externalPriceMeta||{}};i?.forEach(s=>{s?.statistic_id&&(r[s.statistic_id]=s)}),this._externalPriceMeta=r}).catch(i=>{console.warn("[fortum-energy] price metadata fetch failed",i)}).finally(()=>{e.forEach(i=>this._externalPriceMetaInflight.delete(i))}))}_ensureExternalPriceStats(t,e){if(!this._hass||!t.length)return;let i=this._getStatsTimeBounds(e);if(!i)return;let r=`${i.start}:${i.end}`;this._externalPriceRangeKey!==r&&(this._externalPriceRangeKey=r,this._externalPriceStats={},this._externalPriceInflight=new Set),this._externalPriceInflight||(this._externalPriceInflight=new Set);let s=t.filter(o=>o&&!this._externalPriceStats?.[o]&&!this._externalPriceInflight?.has(o));s.length&&(s.forEach(o=>this._externalPriceInflight.add(o)),this._hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(i.start).toISOString(),end_time:new Date(i.end).toISOString(),statistic_ids:s,period:"hour"}).then(o=>{if(this._externalPriceRangeKey!==r)return;let a={...this._externalPriceStats||{}};s.forEach(c=>{a[c]=this._normalizeExternalPriceSeries(o?.[c])}),this._externalPriceStats=a,this._scheduleOverlayApply()}).catch(o=>{console.warn("[fortum-energy] price statistics fetch failed",o)}).finally(()=>{s.forEach(o=>this._externalPriceInflight.delete(o))}))}_collectPriceByTimestamp(t){let e={},i=t?.prefs||G,r=[],s=[],o=u=>{if(!u)return;let h=this._externalPriceStats?.[u];h&&(s.push(u),h.forEach(_=>{_.change===null||_.change===void 0||(e[_.start]=(e[_.start]||0)+_.change)}))};i.energy_sources.forEach(u=>{if(u.type!=="grid")return;(Array.isArray(u.flow_from)?u.flow_from:[u]).forEach(_=>{let p=this._toFortumPriceStatId(_.stat_energy_from);p&&r.push(p),o(p)})});let a=Array.from(new Set(r));this._ensureExternalPriceStats(a,t),this._ensureExternalPriceMetadata(a);let c=s[0],d=c?this._externalPriceMeta?.[c]?.statistics_unit_of_measurement:void 0;return this._priceUnit=d||this._priceUnit||"",Object.keys(e).map(u=>[Number(u),e[u]]).sort((u,h)=>u[0]-h[0])}_getOverlayColor(){return getComputedStyle(this).getPropertyValue("--warning-color").trim()||"#f59f00"}_getPriceOverlayColor(){return getComputedStyle(this).getPropertyValue("--info-color").trim()||"#2f7ed8"}_formatCost(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._costUnit||this._hass?.config?.currency||"EUR";return/^[A-Z]{3}$/.test(r)?new Intl.NumberFormat(i,{style:"currency",currency:r,maximumFractionDigits:2}).format(e):`${new Intl.NumberFormat(i,{maximumFractionDigits:2}).format(e)} ${r}`}_formatPrice(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en";return`${new Intl.NumberFormat(i,{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)} ${this._priceUnit||"EUR/kWh"}`}_escapeRegExp(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_applyOverlayToDetailCard(t,e){let i=this._collectCostByTimestamp(e),r=this._collectPriceByTimestamp(e);if(!i.length&&!r.length||!Array.isArray(t._chartData))return;let s=this._getOverlayColor(),o=this._getPriceOverlayColor();if(t._chartData=t._chartData.filter(a=>a.id!=="fortum-energy-cost-overlay"&&a.id!=="fortum-energy-price-overlay"),i.length&&(t._chartData=t._chartData.concat({id:"fortum-energy-cost-overlay",name:"Cost",type:"line",smooth:.2,symbol:"none",showSymbol:!1,yAxisIndex:1,z:80,lineStyle:{width:2,color:s},itemStyle:{color:s},tooltip:{valueFormatter:a=>this._formatCost(a)},data:i})),r.length&&(t._chartData=t._chartData.concat({id:"fortum-energy-price-overlay",name:"Price",type:"line",smooth:.05,symbol:"none",showSymbol:!1,yAxisIndex:2,z:79,lineStyle:{width:2,type:"dashed",color:o},itemStyle:{color:o},data:r})),Array.isArray(t._legendData)){let a=t._legendData.filter(c=>c.id!=="fortum-energy-cost-overlay"&&c.id!=="fortum-energy-price-overlay");i.length&&a.push({id:"fortum-energy-cost-overlay",secondaryIds:[],name:"Cost",itemStyle:{color:s,borderColor:s}}),r.length&&a.push({id:"fortum-energy-price-overlay",secondaryIds:[],name:"Price",itemStyle:{color:o,borderColor:o}}),t._legendData=a}typeof t.requestUpdate=="function"&&t.requestUpdate()}_applyCostOverlay(){let t=this._innerCard?.querySelector("hui-energy-devices-detail-graph-card");if(!t)return;let e=this._energyData||this._collection?.state;if(e){if(!t.__myEnergyOverlayPatched){t.__myEnergyOverlayPatched=!0;let i=t._createOptions?.bind(t);i&&(t._createOptions=(...s)=>{let o=i(...s),a=Array.isArray(o?.yAxis)?o.yAxis[0]||{type:"value"}:o?.yAxis||{type:"value"},c={type:"value",position:"right",splitLine:{show:!1},axisLabel:{formatter:p=>this._formatCost(p)}},d={type:"value",position:"right",offset:56,splitLine:{show:!1},axisLabel:{formatter:p=>this._formatPrice(p)}},u=o?.tooltip?.formatter,h={...o?.tooltip||{},formatter:p=>{let y=typeof u=="function"?u(p):u,g=(Array.isArray(p)?p:[p]).filter(v=>v&&(v.seriesId==="fortum-energy-cost-overlay"||v.seriesId==="fortum-energy-price-overlay"));if(ut(this._hass?.config?.version,"2026.6.0")){if(!g.length)return y;let v="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;",E=g.map(m=>{let w=m.seriesName||"Cost",S=Array.isArray(m.value)?Number(m.value[1]||0):0,$=m.seriesId==="fortum-energy-price-overlay"?this._formatPrice(S):this._formatCost(S);return q`<br /><span style="${v}background-color:${m.color};"></span>
                    ${w}: <span style="direction:ltr; display: inline;">${$}</span>`});return q`${y}${E}`}if(typeof y!="string")return y;let b=y;return g.forEach(v=>{let E=v.seriesName||"Cost",m=Array.isArray(v.value)?Number(v.value[1]||0):0,w=v.seriesId==="fortum-energy-price-overlay"?this._formatPrice(m):this._formatCost(m),S=`${E}: <div style="direction:ltr; display: inline;">${w}</div>`,$=new RegExp(`${this._escapeRegExp(E)}: <div style="direction:ltr; display: inline;">[^<]*?<\\/div>`);b=b.replace($,S)}),b}},_=o?.legend?{...o.legend,data:Array.isArray(t._legendData)?t._legendData:o.legend.data}:o?.legend;return{...o,tooltip:h,legend:_,yAxis:[a,c,d]}});let r=t._processStatistics?.bind(t);r&&(t._processStatistics=()=>{let s=this._energyData||this._collection?.state||t._data;r(),s&&this._applyOverlayToDetailCard(t,s)})}this._applyOverlayToDetailCard(t,e)}}};var vi=({usedTotalByMathBucket:n,deviceTotalsByMathBucket:t,bucketMs:e,flowBucketMs:i})=>{let r=new Map,s=new Map;return Array.from(new Set([...Array.from((n||new Map).keys()),...Array.from((t||new Map).keys())])).sort((a,c)=>a-c).forEach(a=>{let c=n.has(a),d=n.get(a)||0,u=t.get(a)||0,h=c?d-u:0;if(!c){r.set(a,0),s.set(a,0);return}if(e<i){r.set(a,(r.get(a)||0)+d),s.set(a,(s.get(a)||0)+h);return}r.set(a,(r.get(a)||0)+d),s.set(a,(s.get(a)||0)+h)}),{totalConsumedByBucket:r,untrackedByBucket:s}};Ct();var xi="[REDACTED]",Cr=new Set(["access_token","refreshtoken","refresh_token","idtoken","id_token","token","authorization","cookie","cookies","set-cookie","session","session_data","session_cookies","password","username","customerid","customer_id","postaladdress","postal_address","postoffice","post_office","name","address","label","entity_id","entity_ids"]),Ar=new Set(["access_token","refreshtoken","refresh_token","idtoken","id_token","token","authorization","cookie","cookies","set-cookie","session","session_data","session_cookies","password"]),$r=[[/\b(Bearer)\s+([^\s,;]+)/gi,"$1 [REDACTED]"],[/\b(authorization|access_token|refresh_token|id_token|token|password|cookie|set-cookie|csrftoken)\b\s*[:=]\s*(?:Bearer\s+)?([^\s,;]+)/gi,"$1=[REDACTED]"],[/("(?:authorization|access_token|refresh_token|id_token|token|password|cookie|set-cookie|csrftoken)"\s*:\s*")([^"]+)(")/gi,"$1[REDACTED]$3"]],kr=()=>({personalMap:new Map,personalCounter:0}),Ei=n=>typeof n=="string"&&/^\d+$/.test(n.trim()),Pr=n=>String(n||"value").trim().toLowerCase().replace(/[^a-z0-9_]+/g,"_").replace(/^_+|_+$/g,"")||"value",Ht=(n,t,e)=>{let i=typeof n=="string"?n.trim():"";if(!i)return"";let r=e.personalMap.get(i);if(r)return r;e.personalCounter+=1;let o=`[REDACTED ${Pr(t)} ${e.personalCounter}]`;return e.personalMap.set(i,o),o},Dr=n=>typeof n!="string"?n:$r.reduce((t,[e,i])=>t.replace(e,i),n),Si=(n,t,e)=>typeof n!="string"?n:Ar.has(t)?xi:t==="number"||t==="metering_point_no"?Ei(n)?n.trim():Ht(n,t,e):Ht(n,t==="entity_ids"?"entity_id":t,e),At=(n,t,e)=>{if(Array.isArray(n))return(typeof t=="string"?t.toLowerCase():"")==="entity_ids"?n.map(r=>typeof r=="string"?Ht(r,"entity_id",e):At(r,"",e)):n.map(r=>At(r,t,e));if(n&&typeof n=="object"){let i={};return Object.entries(n).forEach(([r,s])=>{let o=r.toLowerCase();if(Cr.has(o)){Array.isArray(s)?i[r]=s.map(a=>Si(a,o,e)):s&&typeof s=="object"?i[r]=At(s,r,e):i[r]=Si(s,o,e);return}if((o==="number"||o==="metering_point_no")&&typeof s=="string"){i[r]=Ei(s)?s.trim():Ht(s,o,e);return}i[r]=At(s,r,e)}),i}return typeof n=="string"?Dr(n):n},Ci=n=>{let t=kr();return At(n,"",t)},Ai=xi;var $e="__fortumEnergyDashboardDebugStore",$i=160,ki=400,Pi="fortum-energy-debug-tab-id",ke=n=>{let t=Math.random().toString(36).slice(2,10);return`${n}_${Date.now().toString(36)}_${t}`},Di=()=>{let n=mt();if(n.clientContext)return n.clientContext;let t="tab_unknown";if(typeof sessionStorage<"u")try{let e=sessionStorage.getItem(Pi);e&&e.trim().length?t=e.trim():(t=ke("tab"),sessionStorage.setItem(Pi,t))}catch{t=ke("tab")}return n.clientContext={tab_id:t,session_id:ke("session"),created_at:new Date().toISOString()},n.clientContext},Ir=n=>{let t=n?.config?.version;return typeof t=="string"&&t.trim().length?t.trim():"unknown"},Nr=()=>{let n=globalThis.__fortumEnergyIntegrationVersion;return typeof n=="string"&&n.trim().length?n.trim():"unknown"},Tr=()=>{if(typeof navigator>"u")return{user_agent:"unknown",language:"unknown",platform:"unknown"};let n=navigator.userAgentData?.platform;return{user_agent:navigator.userAgent||"unknown",language:navigator.language||"unknown",platform:typeof n=="string"&&n||navigator.platform||"unknown"}},F=n=>{if(typeof structuredClone=="function")try{return structuredClone(n)}catch{}return JSON.parse(JSON.stringify(n))},mt=()=>(globalThis[$e]||(globalThis[$e]={adaptiveHistory:[],latestAdaptive:null,latestFuturePrice:null,cardConfigs:{},sequence:0,eventSequence:0,eventTimeline:[],clientContext:null}),globalThis[$e]),Ii=()=>F(Di()),Ni=n=>{if(!n||typeof n!="object")return;let t=mt();t.eventSequence+=1;let e={event_sequence:t.eventSequence,recorded_at:new Date().toISOString(),...F(n)};t.eventTimeline.push(e),t.eventTimeline.length>ki&&t.eventTimeline.splice(0,t.eventTimeline.length-ki)},pt=(n,t)=>{if(typeof n!="string"||!n.length)return;let e=mt();e.cardConfigs[n]=F(t||{})},Ti=n=>{if(!n||typeof n!="object")return;let t=mt();t.sequence+=1;let e={sequence:t.sequence,recorded_at:new Date().toISOString(),...F(n)};t.latestAdaptive=e,t.adaptiveHistory.push(e),t.adaptiveHistory.length>$i&&t.adaptiveHistory.splice(0,t.adaptiveHistory.length-$i)},Mi=n=>{if(!n||typeof n!="object")return;let t=mt();t.sequence+=1,t.latestFuturePrice={sequence:t.sequence,recorded_at:new Date().toISOString(),...F(n)}},Mr=n=>U(n).map(t=>({number:t.number,address:t.address,label:t.label,entity_ids:t.entityIds})),Ri=({collectionKey:n,hass:t,adaptiveDebugInfo:e,adaptiveExportData:i})=>{let r=mt(),s=Di(),o={generated_at:new Date().toISOString(),format_version:4,collection_key:n||"",redaction:{enabled:!0,personal_placeholder_format:"[REDACTED <field> <n>]",token_placeholder:Ai},environment:{home_assistant_version:Ir(t),integration_version:Nr(),browser:Tr()},client_context:F(s),dashboard_config:F(r.cardConfigs),discoverable_metering_points:Mr(t),adaptive_graph:{latest_debug:e||r.latestAdaptive,latest_export_data:i?F(i):null,history:F(r.adaptiveHistory),event_timeline:F(r.eventTimeline)},future_price:{latest_debug:F(r.latestFuturePrice)}};return Ci(o)};var Vt=class extends HTMLElement{setConfig(t){this._config=t||{},this._resolvedMetrics=this._config.resolved_metrics||{},this._debugEnabled=this._config.debug===!0,pt("adaptive_graph",this._config),this._debugEnabled||(this._lastAdaptiveDebugSignature=void 0,this._latestAdaptiveDebugInfo=void 0),this._syncDebugLifecycleListeners(),this.shadowRoot||this.attachShadow({mode:"open"}),this._renderBase(),this._trySubscribe()}set hass(t){this._hass=t,this._trySubscribe(),this._ensureChart();let e=this._getCollectionRangeKey();e&&e!==this._lastCollectionRangeKey&&(this._lastCollectionRangeKey=e,this._scheduleUpdate("hass_range_changed"))}connectedCallback(){this._ensureDebugIdentity(),this._ensureResizeObserver(),this._rangeChangedHandler||(this._rangeChangedHandler=t=>this._handleRangeChangedEvent(t),window.addEventListener("fortum-energy:range-changed",this._rangeChangedHandler)),this._exportDebugInfoHandler||(this._exportDebugInfoHandler=t=>this._handleExportDebugInfoRequest(t),window.addEventListener("fortum-energy:export-debug-info",this._exportDebugInfoHandler)),this._syncDebugLifecycleListeners(),this._recordDebugEvent("card_connected")}disconnectedCallback(){this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0),this._collection=void 0,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0),this._rangeChangedHandler&&(window.removeEventListener("fortum-energy:range-changed",this._rangeChangedHandler),this._rangeChangedHandler=void 0),this._exportDebugInfoHandler&&(window.removeEventListener("fortum-energy:export-debug-info",this._exportDebugInfoHandler),this._exportDebugInfoHandler=void 0),this._teardownDebugLifecycleListeners(),this._recordDebugEvent("subscription_state",{action:"disconnected",has_active_subscription:!1,collection_key:this._getCollectionKey()}),this._recordDebugEvent("card_disconnected")}getCardSize(){return 3}_buildCardInstanceId(){let t=Math.random().toString(36).slice(2,10);return`adaptive_card_${Date.now().toString(36)}_${t}`}_ensureDebugIdentity(){if(this._debugIdentity)return this._debugIdentity;let t=Ii(),e=typeof window<"u"&&window.location?`${window.location.pathname}${window.location.search}${window.location.hash}`:"unknown";return this._debugIdentity={...t,card_instance_id:this._buildCardInstanceId(),collection_key:this._getCollectionKey(),location_path:e},this._debugIdentity}_buildDebugContext(t={}){let e=this._ensureDebugIdentity(),i=typeof document<"u"&&typeof document.visibilityState=="string"?document.visibilityState:"unknown";return{...e,visibility_state:i,...t}}_recordDebugEvent(t,e={}){this._debugEnabled&&Ni({source:"adaptive_graph",event_type:t,context:this._buildDebugContext(),payload:e})}_syncDebugLifecycleListeners(){if(this.isConnected){if(!this._debugEnabled){this._teardownDebugLifecycleListeners();return}this._ensureDebugIdentity(),!this._visibilityHandler&&typeof document<"u"&&(this._visibilityHandler=()=>{this._recordDebugEvent("document_visibilitychange")},document.addEventListener("visibilitychange",this._visibilityHandler)),!this._focusHandler&&typeof window<"u"&&(this._focusHandler=()=>this._recordDebugEvent("window_focus"),window.addEventListener("focus",this._focusHandler)),!this._blurHandler&&typeof window<"u"&&(this._blurHandler=()=>this._recordDebugEvent("window_blur"),window.addEventListener("blur",this._blurHandler)),!this._pageshowHandler&&typeof window<"u"&&(this._pageshowHandler=t=>this._recordDebugEvent("window_pageshow",{persisted:t?.persisted===!0}),window.addEventListener("pageshow",this._pageshowHandler)),!this._pagehideHandler&&typeof window<"u"&&(this._pagehideHandler=t=>this._recordDebugEvent("window_pagehide",{persisted:t?.persisted===!0}),window.addEventListener("pagehide",this._pagehideHandler)),!this._storageHandler&&typeof window<"u"&&(this._storageHandler=t=>{this._recordDebugEvent("window_storage",{key:t?.key||null})},window.addEventListener("storage",this._storageHandler))}}_teardownDebugLifecycleListeners(){this._visibilityHandler&&typeof document<"u"&&(document.removeEventListener("visibilitychange",this._visibilityHandler),this._visibilityHandler=void 0),this._focusHandler&&typeof window<"u"&&(window.removeEventListener("focus",this._focusHandler),this._focusHandler=void 0),this._blurHandler&&typeof window<"u"&&(window.removeEventListener("blur",this._blurHandler),this._blurHandler=void 0),this._pageshowHandler&&typeof window<"u"&&(window.removeEventListener("pageshow",this._pageshowHandler),this._pageshowHandler=void 0),this._pagehideHandler&&typeof window<"u"&&(window.removeEventListener("pagehide",this._pagehideHandler),this._pagehideHandler=void 0),this._storageHandler&&typeof window<"u"&&(window.removeEventListener("storage",this._storageHandler),this._storageHandler=void 0)}_getCollection(){let t=this._config?.collection_key||I;return this._hass?.connection?.[`_${t}`]}_getCollectionKey(){return this._config?.collection_key||I}_getCollectionRangeKey(){let t=this._getCollection(),e=t?.start instanceof Date?t.start.getTime():null,i=t?.end instanceof Date?t.end.getTime():null;return!Number.isFinite(e)||!Number.isFinite(i)?null:`${e}:${i}`}_handleRangeChangedEvent(t){let e=t?.detail||{};if(e.collectionKey&&e.collectionKey!==this._getCollectionKey())return;let i=Number(e.start),r=Number(e.end),s=Number.isFinite(i)&&Number.isFinite(r)?`${i}:${r}`:this._getCollectionRangeKey();!s||s===this._lastCollectionRangeKey||(this._lastCollectionRangeKey=s,this._recordDebugEvent("range_changed_event",{detail:e,resolved_range_key:s}),this._scheduleUpdate("range_changed_event"))}_trySubscribe(){let t=this._getCollection();if(!t||!t.subscribe){this._recordDebugEvent("subscription_state",{action:"missing_collection_or_subscribe",has_collection:!!t,has_subscribe:!!t?.subscribe});return}if(t===this._collection&&this._unsubscribe){this._recordDebugEvent("subscription_state",{action:"already_subscribed",has_active_subscription:!0,collection_key:this._getCollectionKey()});return}this._unsubscribe&&this._unsubscribe(),this._collection=t,this._unsubscribe=t.subscribe(()=>{let e=this._collection?.state,i=this._getBounds(e),r=i?`${i.start.getTime()}:${i.end.getTime()}`:this._getCollectionRangeKey();r&&r===this._lastSubscribedRangeKey||(this._lastSubscribedRangeKey=r||null,this._recordDebugEvent("collection_subscribe_range",{range_key:r||null}),this._scheduleUpdate("collection_subscribe_range"))}),this._recordDebugEvent("subscription_state",{action:"subscribed",has_active_subscription:!0,collection_key:this._getCollectionKey()})}_ensureResizeObserver(){this._resizeObserver||typeof ResizeObserver>"u"||(this._resizeObserver=new ResizeObserver(t=>{let e=Array.isArray(t)&&t.length?t[0]:null,i=Number(e?.contentRect?.width),r=Number(e?.contentRect?.height),s=Number.isFinite(i)&&Number.isFinite(r),o=Number.isFinite(this._lastObservedWidth)?this._lastObservedWidth:null,a=Number.isFinite(this._lastObservedHeight)?this._lastObservedHeight:null,c=s&&Number.isFinite(o)?i-o:null,d=s&&Number.isFinite(a)?r-a:null;s&&(this._lastObservedWidth=i,this._lastObservedHeight=r);let u={width:s?i:null,height:s?r:null,prev_width:o,prev_height:a,delta_width:c,delta_height:d};this._recordDebugEvent("resize_observer",u),this._scheduleUpdate("resize",u)}),this._resizeObserver.observe(this))}_renderBase(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        ha-card { height: 100%; }
        .card-header { padding-bottom: 0; }
        .content { padding: 16px; }
        .content.has-header { padding-top: 0; }
        .empty {
          color: var(--secondary-text-color);
          user-select: text;
          -webkit-user-select: text;
          cursor: text;
          white-space: pre-wrap;
        }
        .warning {
          margin-top: 10px;
          color: var(--warning-color);
          user-select: text;
          -webkit-user-select: text;
          cursor: text;
          white-space: pre-wrap;
          font-size: var(--ha-font-size-s);
        }
        .consumption-stats {
          margin-top: 12px;
          border-top: 1px solid var(--divider-color);
          padding-top: 10px;
          font-size: var(--ha-font-size-s);
          color: var(--primary-text-color);
        }
        .consumption-stats table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .consumption-stats th,
        .consumption-stats td {
          padding: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .consumption-stats th {
          color: var(--secondary-text-color);
          font-weight: 500;
        }
        .consumption-stats .series {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .consumption-stats .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid currentColor;
          flex: 0 0 auto;
        }
        .consumption-stats .label {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .consumption-stats th.num,
        .consumption-stats td.num {
          text-align: right;
        }
        .consumption-stats tr.toggleable {
          cursor: pointer;
        }
        .consumption-stats tr.hidden {
          color: var(--secondary-text-color);
        }
        .consumption-stats tr.hidden .dot {
          background: transparent !important;
        }
      </style>
      <ha-card>
        ${this._config?.title?`<h1 class="card-header">${this._config.title}</h1>`:""}
        <div class="content ${this._config?.title?"has-header":""}">
          <ha-chart-base id="chart"></ha-chart-base>
          <div id="empty" class="empty" style="display:none;">No data</div>
          <div id="warning" class="warning" style="display:none;"></div>
          <div id="consumption-stats" class="consumption-stats"></div>
        </div>
      </ha-card>
    `,this._ensureChart())}_ensureChart(){this.shadowRoot&&(this._chart=this.shadowRoot.querySelector("#chart"),this._chart&&this._hass&&(this._chart.hass=this._hass,this._chart.height="320px"))}_scheduleUpdate(t="unspecified",e=null){Number.isFinite(this._updateSequence)||(this._updateSequence=0),Number.isFinite(this._pendingUpdateId)||(this._pendingUpdateId=this._updateSequence+1,this._updateSequence=this._pendingUpdateId),Array.isArray(this._pendingUpdateTriggers)||(this._pendingUpdateTriggers=[]),this._pendingUpdateTriggers.push(t),this._pendingTriggerContexts||(this._pendingTriggerContexts={}),e&&typeof e=="object"&&(this._pendingTriggerContexts[t]=e),!this._updateScheduled&&(this._updateScheduled=!0,requestAnimationFrame(()=>{this._updateScheduled=!1;let i=this._pendingUpdateTriggers?.length?this._pendingUpdateTriggers.slice():["unspecified"],r=i[0]||"unspecified",s=i[i.length-1]||"unspecified",o=this._pendingUpdateId;this._lastUpdateMeta={updateId:o,primaryTrigger:r,finalTrigger:s,triggerChain:i,triggerContexts:{...this._pendingTriggerContexts||{}}},this._lastUpdateTrigger=s,this._pendingUpdateId=void 0,this._pendingUpdateTriggers=[],this._pendingTriggerContexts=void 0,this._updateChart()}))}_getBounds(t){let e=t?.start instanceof Date?t.start:null,i=t?.end instanceof Date?t.end:null;return!e||!i?null:{start:e,end:i}}_normalizeStatsSeries(t){return Array.isArray(t)?t.map(e=>{let i=typeof e?.start=="number"?e.start:typeof e?.start=="string"?Date.parse(e.start):NaN,r=Number(e?.change);return!Number.isFinite(i)||!Number.isFinite(r)?null:{start:i,change:r}}).filter(Boolean).sort((e,i)=>e.start-i.start):[]}_pickBucketMs(t,e,i,r){let s=Math.max(1,e.getTime()-t.getTime()),o=Math.max(1,Math.floor(Math.max(240,i||0)/12)),a=[15*60*1e3,60*60*1e3,3*60*60*1e3,6*60*60*1e3,12*60*60*1e3,24*60*60*1e3].filter(c=>c>=r);for(let c of a)if(Math.ceil(s/c)<=o)return c;return 24*60*60*1e3}_bucketStart(t,e){let i=new Date(t);i.setHours(0,0,0,0);let r=i.getTime();return e>=24*60*60*1e3?r:r+Math.floor((t-r)/e)*e}_bucketSeries(t,e){let i=new Map;return(t||[]).forEach(r=>{let s=this._bucketStart(r.start,e);i.set(s,(i.get(s)||0)+r.change)}),i}_accumulateSeriesAverage(t,e,i,r){(t||[]).forEach(s=>{let o=this._bucketStart(s.start,e);i.set(o,(i.get(o)||0)+s.change),r.set(o,(r.get(o)||0)+1)})}_mergeInto(t,e){e.forEach((i,r)=>{t.set(r,(t.get(r)||0)+i)})}_fetchStats(t,e,i,r,s=["change"]){return t.length?this._hass.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),end_time:i.toISOString(),statistic_ids:t,period:r,types:s}):Promise.resolve({})}_normalizePriceSeries(t){return Array.isArray(t)?t.map(e=>{let i=typeof e?.start=="number"?e.start:typeof e?.start=="string"?Date.parse(e.start):NaN,r=Number(e?.mean);return!Number.isFinite(i)||!Number.isFinite(r)?null:{start:i,change:r}}).filter(Boolean).sort((e,i)=>e.start-i.start):[]}_fetchStatsMetadata(t){let e=Array.from(new Set((t||[]).filter(Boolean)));return e.length?this._hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e}).then(i=>{let r={};return(i||[]).forEach(s=>{s?.statistic_id&&(r[s.statistic_id]=s)}),r}):Promise.resolve({})}_resolveItemizationName(t,e){let i=typeof t?.name=="string"?t.name.trim():"";if(i)return i;let r=typeof t?.stat=="string"?t.stat:"";if(!r)return"";let s=this._resolveDeviceNameFromEntity(r);if(s)return s;let o=this._hass?.states?.[r]?.attributes?.friendly_name;if(typeof o=="string"&&o.trim())return o.trim();let a=typeof e?.name=="string"?e.name.trim():"";return a||r}_resolveDeviceNameFromEntity(t){let e=this._hass?.entities?.[t];if(!e||typeof e!="object")return"";let i=e.device_id;if(typeof i!="string"||!i)return"";let r=this._hass?.devices?.[i];if(!r||typeof r!="object")return"";let s=typeof r.name_by_user=="string"?r.name_by_user.trim():"";return s||(typeof r.name=="string"?r.name.trim():"")}_getGraphColorByIndex(t){let e=getComputedStyle(this);return(e.getPropertyValue(`--graph-color-${t+1}`)||e.getPropertyValue(`--color-${t%54+1}`)).trim()||"#5B8FF9"}_getUntrackedColor(){return getComputedStyle(this).getPropertyValue("--history-unknown-color").trim()||"#9DA0A2"}_getCostColor(){return getComputedStyle(this).getPropertyValue("--warning-color").trim()||"#f59f00"}_getPriceColor(){return getComputedStyle(this).getPropertyValue("--info-color").trim()||"#2f7ed8"}_getTemperatureColor(){return getComputedStyle(this).getPropertyValue("--error-color").trim()||"#d9480f"}_formatCostValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._costUnit||"";if(/^[A-Z]{3}$/.test(r))return new Intl.NumberFormat(i,{style:"currency",currency:r,maximumFractionDigits:2}).format(e);let s=new Intl.NumberFormat(i,{maximumFractionDigits:2}).format(e);return r?`${s} ${r}`:s}_formatCostAxisValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._costUnit||"",s=this._costAxisDigits||0;if(/^[A-Z]{3}$/.test(r))return new Intl.NumberFormat(i,{style:"currency",currency:r,minimumFractionDigits:s,maximumFractionDigits:s}).format(e);let o=new Intl.NumberFormat(i,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return r?`${o} ${r}`:o}_formatPriceValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=new Intl.NumberFormat(i,{minimumFractionDigits:1,maximumFractionDigits:1}).format(e);return this._priceUnit?`${r} ${this._priceUnit}`:r}_formatPriceAxisValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._priceAxisDigits||0,s=new Intl.NumberFormat(i,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),o=(this._priceUnit||"").split("/")[0].trim();return o?`${s} ${o}`:s}_formatTemperatureAxisValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._temperatureAxisDigits||0,s=new Intl.NumberFormat(i,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e);return this._temperatureUnit?`${s} ${this._temperatureUnit}`:s}_formatTemperatureValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=new Intl.NumberFormat(i,{minimumFractionDigits:1,maximumFractionDigits:1}).format(e);return this._temperatureUnit?`${r} ${this._temperatureUnit}`:r}_formatEnergyStatValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=new Intl.NumberFormat(i,{minimumFractionDigits:0,maximumFractionDigits:2}).format(e);return this._energyUnit?`${r} ${this._energyUnit}`:r}_renderCustomLegendTable(t,e){let i=this.shadowRoot?.querySelector("#consumption-stats");if(!i)return;let r=(s,o)=>o==null||Number.isNaN(Number(o))?"":s?.kind==="cost"?this._formatCostValue(o):s?.kind==="price"?this._formatPriceValue(o):s?.kind==="temperature"?this._formatTemperatureValue(o):this._formatEnergyStatValue(o);i.innerHTML=`
      <table>
        <thead>
          <tr>
            <th>Series</th>
            <th class="num">Min</th>
            <th class="num">Max</th>
            <th class="num">Avg</th>
            <th class="num">Sum</th>
            <th class="num">Last</th>
          </tr>
        </thead>
        <tbody>
          ${(t||[]).map(s=>`
            <tr class="${s.id?"toggleable":""} ${s.id&&e?.has(s.id)?"hidden":""}" ${s.id?`data-series-id="${s.id}"`:""}>
              <td><span class="series"><span class="dot" style="color: ${s.color}; background-color: ${s.color};"></span><span class="label">${s.name}</span></span></td>
              <td class="num">${r(s,s.min)}</td>
              <td class="num">${r(s,s.max)}</td>
              <td class="num">${r(s,s.avg)}</td>
              <td class="num">${r(s,s.sum)}</td>
              <td class="num">${r(s,s.last)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `,i.onclick=s=>{let a=s.target?.closest?.("tr[data-series-id]")?.getAttribute?.("data-series-id");a&&this._toggleSeriesVisibility(a)}}_toggleSeriesVisibility(t){this._hiddenSeriesIds||(this._hiddenSeriesIds=new Set),this._hiddenSeriesIds.has(t)?this._hiddenSeriesIds.delete(t):this._hiddenSeriesIds.add(t),this._applySeriesVisibility()}_initializeSeriesVisibility(t){let e=new Set((t||[]).map(i=>i?.id).filter(Boolean));this._hiddenSeriesIds||(this._hiddenSeriesIds=new Set),this._defaultHiddenSeriesIdsApplied||(this._defaultHiddenSeriesIdsApplied=new Set),["adaptive-price-overlay","adaptive-temperature-overlay"].forEach(i=>{e.has(i)&&!this._defaultHiddenSeriesIdsApplied.has(i)&&(this._hiddenSeriesIds.add(i),this._defaultHiddenSeriesIdsApplied.add(i))}),this._seriesVisibilityInitialized=!0}_formatDebugDateTime(t){if(!Number.isFinite(t))return null;let e=new Date(t);return{ts:t,iso:e.toISOString(),local:e.toString()}}_getSeriesEdge(t){let e=(t?.data||[]).map(s=>{if(!Array.isArray(s)||s.length<2)return null;let o=Number(s[0]),a=Number(s[1]);return!Number.isFinite(o)||!Number.isFinite(a)?null:[o,a]}).filter(Boolean).sort((s,o)=>s[0]-o[0]);if(!e.length)return{id:t?.id||"",name:t?.name||"",pointCount:0,nonZeroPointCount:0,xStart:null,xEnd:null,yMin:null,yMax:null,firstPoint:null,lastPoint:null};let i=e.map(s=>s[0]),r=e.map(s=>s[1]);return{id:t?.id||"",name:t?.name||"",pointCount:e.length,nonZeroPointCount:r.filter(s=>Math.abs(s)>1e-12).length,xStart:this._formatDebugDateTime(Math.min(...i)),xEnd:this._formatDebugDateTime(Math.max(...i)),yMin:Math.min(...r),yMax:Math.max(...r),firstPoint:{at:this._formatDebugDateTime(e[0][0]),value:e[0][1]},lastPoint:{at:this._formatDebugDateTime(e[e.length-1][0]),value:e[e.length-1][1]}}}_getOverallSeriesEdges(t){let e=[];if((t||[]).forEach(s=>{(s?.data||[]).forEach(o=>{if(!Array.isArray(o)||o.length<2)return;let a=Number(o[0]),c=Number(o[1]);!Number.isFinite(a)||!Number.isFinite(c)||e.push([a,c])})}),!e.length)return{pointCount:0,nonZeroPointCount:0,xStart:null,xEnd:null,yMin:null,yMax:null};let i=e.map(s=>s[0]),r=e.map(s=>s[1]);return{pointCount:e.length,nonZeroPointCount:r.filter(s=>Math.abs(s)>1e-12).length,xStart:this._formatDebugDateTime(Math.min(...i)),xEnd:this._formatDebugDateTime(Math.max(...i)),yMin:Math.min(...r),yMax:Math.max(...r)}}_buildFetchPointCounts(t,e){return(t||[]).map(i=>({id:i,points:Array.isArray(e?.[i])?e[i].length:0}))}_buildRangeTransition(t){let e=t?.start?.getTime?.(),i=t?.end?.getTime?.(),r=this._lastDebugBounds?.start??null,s=this._lastDebugBounds?.end??null,o={relation:"unknown",gapMs:null,previous:{start:this._formatDebugDateTime(r),end:this._formatDebugDateTime(s)},current:{start:this._formatDebugDateTime(e),end:this._formatDebugDateTime(i)}};return!Number.isFinite(e)||!Number.isFinite(i)?o:!Number.isFinite(r)||!Number.isFinite(s)?(this._lastDebugBounds={start:e,end:i},o.relation="initial",o):e===r&&i===s?(o.relation="same",this._lastDebugBounds={start:e,end:i},o):e===s+1?(o.relation="adjacent_forward",this._lastDebugBounds={start:e,end:i},o):i+1===r?(o.relation="adjacent_backward",this._lastDebugBounds={start:e,end:i},o):e<=s&&i>=r?(o.relation="overlap",this._lastDebugBounds={start:e,end:i},o):e>s?(o.relation="gap_after_previous",o.gapMs=e-s-1,this._lastDebugBounds={start:e,end:i},o):(o.relation="gap_before_previous",o.gapMs=r-i-1,this._lastDebugBounds={start:e,end:i},o)}_buildAdaptiveDebugSignature(t){return JSON.stringify(t)}_logAdaptiveGraphDebug({updateMeta:t,bounds:e,bucketMs:i,devicePeriod:r,flowPeriod:s,deviceIds:o,flowAndCostIds:a,flowIds:c,overlayIds:d,deviceRaw:u,flowRaw:h,priceRaw:_,temperatureRaw:p,series:y,costPoints:x,pricePoints:g,temperaturePoints:b,untrackedPoints:v}){if(!this._debugEnabled)return;let E=this._hiddenSeriesIds||new Set,m=(y||[]).filter(A=>!E.has(A.id)),w=m.map(A=>this._getSeriesEdge(A)),S=t||{primaryTrigger:"unspecified",finalTrigger:"unspecified",triggerChain:["unspecified"],triggerContexts:{}},$=this._buildRangeTransition(e),W=Number(this._chart?.clientWidth),L=Number(this.clientWidth),te={range:{start:this._formatDebugDateTime(e?.start?.getTime?.()),end:this._formatDebugDateTime(e?.end?.getTime?.())},updateTrigger:S.finalTrigger,updatePrimaryTrigger:S.primaryTrigger,updateTriggerChain:S.triggerChain,updateTriggerContext:S.triggerContexts,rangeTransition:$,renderContext:{chartWidth:Number.isFinite(W)?W:null,hostWidth:Number.isFinite(L)?L:null},bucketMs:i,period:{device:r,flowAndCost:s,price:"hour",temperature:"hour"},ids:{deviceIds:o||[],flowAndCostIds:a||[],flowFromGrid:c?.fromGrid||[],flowToGrid:c?.toGrid||[],flowSolar:c?.solar||[],flowFromBattery:c?.fromBattery||[],flowToBattery:c?.toBattery||[],costImport:d?.importCost||[],costExportComp:d?.exportCompensation||[],price:d?.price||[],temperature:d?.temperature||[]},fetchPointCounts:{device:this._buildFetchPointCounts(o,u),flowAndCost:this._buildFetchPointCounts(a,h),price:this._buildFetchPointCounts(d?.price,_),temperature:this._buildFetchPointCounts(d?.temperature,p)},chart:{allSeriesIds:(y||[]).map(A=>A.id),hiddenSeriesIds:Array.from(E),visibleSeriesIds:m.map(A=>A.id),pointCounts:{untracked:v.length,cost:x.length,price:g.length,temperature:b.length},nonZeroPointCounts:{untracked:v.filter(A=>Math.abs(Number(A?.[1])||0)>1e-12).length,cost:x.filter(A=>Math.abs(Number(A?.[1])||0)>1e-12).length,price:g.filter(A=>Math.abs(Number(A?.[1])||0)>1e-12).length,temperature:b.filter(A=>Math.abs(Number(A?.[1])||0)>1e-12).length},visibleSeriesEdges:w,overallVisibleEdges:this._getOverallSeriesEdges(m),overallAllSeriesEdges:this._getOverallSeriesEdges(y||[])}},it=this._buildAdaptiveDebugSignature(te);if(it===this._lastAdaptiveDebugSignature)return;this._lastAdaptiveDebugSignature=it;let rt=[];(d?.importCost?.length||d?.exportCompensation?.length)&&!x.length&&rt.push({code:"cost_overlay_without_points",importCostIds:d.importCost,exportCompensationIds:d.exportCompensation}),(!v.length||!v.some(A=>Math.abs(Number(A?.[1])||0)>1e-12))&&rt.push({code:"untracked_without_non_zero_points"});let R={source:"adaptive_graph",context:this._buildDebugContext(),payload:te,warnings:rt};this._latestAdaptiveDebugInfo=R,Ti(R)}_applySeriesVisibility(){if(!this._chart||!this._allSeries||!this._chartOptions)return;let t=this._hiddenSeriesIds||new Set,e=this._allSeries.filter(d=>!t.has(d.id)),i=e.some(d=>Array.isArray(d.data)&&d.data.length),r=this.shadowRoot?.querySelector("#empty");r&&(r.style.display=i?"none":"block"),this._chart.hass=this._hass,this._chart.data=e,this._chart.options=this._chartOptions;let s=this._lastUpdateMeta?.updateId??null,o=this._latestAdaptiveDebugInfo?.payload?.range?.start?.iso||null,a=this._latestAdaptiveDebugInfo?.payload?.range?.end?.iso||null;this._recordDebugEvent("update_applied",{update_id:s,range_start:o,range_end:a,visible_series_count:e.length}),this._chart.requestUpdate?.();let c=this._chart.updateComplete;c&&typeof c.then=="function"&&c.then(()=>{this._recordDebugEvent("render_committed",{update_id:s,range_start:o,range_end:a})}).catch(()=>{this._recordDebugEvent("render_commit_failed",{update_id:s})}),this._renderCustomLegendTable(this._legendRows||[],t)}_showCardError(t){this._setLoadingState(!1);let e=this.shadowRoot?.querySelector("#empty");e&&(e.textContent=t,e.style.display="block"),this._allSeries=[],this._chartOptions={legend:{show:!1,type:"custom"},xAxis:{type:"time"},yAxis:[{type:"value"}],tooltip:{show:!1}},this._legendRows=[],this._chart&&(this._chart.hass=this._hass,this._chart.data=[],this._chart.options=this._chartOptions,this._chart.requestUpdate?.()),this._renderCustomLegendTable([],this._hiddenSeriesIds||new Set)}_setCardWarning(t){let e=this.shadowRoot?.querySelector("#warning");if(!e)return;let i=typeof t=="string"?t.trim():"";e.textContent=i,e.style.display=i?"block":"none"}_setLoadingState(t,e="Loading consumption data..."){this._isLoading=t===!0;let i=this.shadowRoot?.querySelector("#empty");if(i){if(this._isLoading){i.textContent=e,i.style.display="block";return}i.textContent===e&&(i.style.display="none")}}_buildUpdateSignature(t,e){let i={rangeKey:t,consumption:Array.isArray(e?.consumption)?e.consumption:[],itemizations:Array.isArray(e?.itemizations)?e.itemizations.map(r=>({stat:r?.stat||"",name:r?.name||""})).sort((r,s)=>String(r.stat).localeCompare(String(s.stat))):[],cost:Array.isArray(e?.cost)?e.cost:[],price:Array.isArray(e?.price)?e.price:[],temperature:Array.isArray(e?.temperature)?e.temperature:[],temperatureOverride:e?.temperature_override===!0};return JSON.stringify(i)}_queueRetryForRange(t,e=800){!t||this._pendingRetryRangeKey===t||(this._pendingRetryRangeKey=t,window.setTimeout(()=>{this._pendingRetryRangeKey===t&&(this._pendingRetryRangeKey=null,this._scheduleUpdate("retry"))},e))}_energyUnitToJouleFactor(t){let e=typeof t=="string"?t.trim():"",i={J:1,kJ:1e3,MJ:1e6,GJ:1e9,cal:4.184,kcal:4184,Mcal:4184e3,Gcal:4184e6,mWh:3.6,Wh:3600,kWh:36e5,MWh:36e8,GWh:36e11,TWh:36e14};return Number.isFinite(i[e])?i[e]:null}_energyUnitConversionFactor(t,e){if(!t||!e)return null;if(t===e)return 1;let i=this._energyUnitToJouleFactor(t),r=this._energyUnitToJouleFactor(e);return!i||!r?null:i/r}_normalizeStatsSeriesWithFactor(t,e=1){return Array.isArray(t)?t.map(i=>{let r=typeof i?.start=="number"?i.start:typeof i?.start=="string"?Date.parse(i.start):NaN,s=Number(i?.change);return!Number.isFinite(r)||!Number.isFinite(s)?null:{start:r,change:s*e}}).filter(Boolean).sort((i,r)=>i.start-r.start):[]}_serializeMap(t){return Array.from((t||new Map).entries()).map(([e,i])=>[Number(e),Number(i)]).sort((e,i)=>e[0]-i[0])}_downloadDebugInfo(t){let e=JSON.stringify(t,null,2),i=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(i),s=document.createElement("a"),o=new Date().toISOString().replace(/[:.]/g,"-");s.href=r,s.download=`fortum-dashboard-debug-${o}.json`,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(r)}_handleExportDebugInfoRequest(t){if(!this._debugEnabled)return;let e=t?.detail||{};if(e.collectionKey&&e.collectionKey!==this._getCollectionKey())return;let i={source:"adaptive_graph",error:"No adaptive graph debug info available yet. Wait for chart data to load."},r=Ri({collectionKey:this._getCollectionKey(),hass:this._hass,adaptiveDebugInfo:this._latestAdaptiveDebugInfo||i,adaptiveExportData:this._latestAdaptiveExportData});e.download!==!1&&this._downloadDebugInfo(r)}_resolveEnergyUnit(t,e){let i=t?.statsMetadata||{};return(e||[]).map(s=>i?.[s]?.statistics_unit_of_measurement).find(s=>typeof s=="string"&&s.length)||""}_formatBucketDate(t,e){return new Date(t).toLocaleDateString(e,{day:"2-digit",month:"short"})}_formatHourRange(t,e){let i=new Date(t),r=new Date(t+e),s=o=>String(o).padStart(2,"0");return e<60*60*1e3?`${s(i.getHours())}:${s(i.getMinutes())}-${s(r.getHours())}:${s(r.getMinutes())}`:`${s(i.getHours())}-${s(r.getHours())}`}_formatBucketLabel(t,e,i,r){if(e>=24*60*60*1e3)return this._formatBucketDate(t,r);let s=i>24*60*60*1e3,o=this._formatHourRange(t,e);return s?`${this._formatBucketDate(t,r)} ${o}`:o}async _updateChart(){if(this._hass&&(this._ensureChart(),!!this._chart))try{let t=this._collection?.state,e=this._getBounds(t);if(!t||!e){this._showCardError("Energy data is unavailable.");return}let i=this._resolvedMetrics||{},r=`${e.start.getTime()}:${e.end.getTime()}`,s=this._buildUpdateSignature(r,i);if(s===this._lastRenderedUpdateSignature){this._recordDebugEvent("update_skipped_same_signature",{update_id:this._lastUpdateMeta?.updateId??null,range_key:r});return}this._setLoadingState(!0);let o=(this._token||0)+1;this._token=o;let a=Array.isArray(i.itemizations)?i.itemizations:[],c=a.map(l=>l?.stat).filter(l=>typeof l=="string"&&l.length),d=Array.isArray(i.consumption)?i.consumption.filter(l=>typeof l=="string"&&l.length):[];if(!d.length){this._showCardError("No Fortum consumption source configured for single strategy.");return}let u=await this._fetchStatsMetadata([...d,...c]);if(this._token!==o)return;if(d.filter(l=>!u?.[l]).length===d.length){let l=this._resolvedMetrics?.consumption?.[0]?.replace("fortum:hourly_consumption_","")?.toUpperCase?.(),f=l?`Configured metering point ${l} has no Fortum consumption data.`:"Configured Fortum metering point has no consumption data.";this._showCardError(`${f} Check strategy metering point number.`);return}let _=c.filter(l=>!u?.[l]),p=d.map(l=>u?.[l]?.statistics_unit_of_measurement).find(l=>typeof l=="string"&&l.length),y=[],x=a.filter(l=>{let f=l?.stat;if(typeof f!="string"||!f.length||_.includes(f))return!1;let C=u?.[f]?.statistics_unit_of_measurement;return this._energyUnitConversionFactor(C,p)===null?(y.push(`${f} (${typeof C=="string"&&C?C:"unknown unit"})`),!1):!0}),g=[];_.length&&g.push(..._.map(l=>`Missing itemization statistic: ${l}.`)),y.length&&g.push(...y.map(l=>`Excluded itemization statistic with unsupported unit conversion: ${l}.`)),this._setCardWarning(g.join(`
`));let b={importCost:Array.isArray(i.cost)?i.cost.filter(l=>typeof l=="string"&&l.length):[],exportCompensation:[],price:Array.isArray(i.price)?i.price.filter(l=>typeof l=="string"&&l.length):[],temperature:Array.isArray(i.temperature)?i.temperature.filter(l=>typeof l=="string"&&l.length):[]},v={fromGrid:d,toGrid:[],solar:[],fromBattery:[],toBattery:[]},E=this._chart.clientWidth||this.clientWidth||0,m=this._pickBucketMs(e.start,e.end,E,15*60*1e3),w=m<=15*60*1e3?"5minute":"hour",S="hour",$=60*60*1e3;this._energyUnit=p||this._resolveEnergyUnit(t,[...c,...v.fromGrid,...v.toGrid,...v.solar,...v.fromBattery,...v.toBattery]);let W=Array.from(new Set([...v.fromGrid,...b.importCost])),L=await this._fetchStats(c,e.start,e.end,w);if(this._token!==o||w==="5minute"&&c.some(l=>!Array.isArray(L?.[l])||L[l].length===0)&&(w="hour",m=this._pickBucketMs(e.start,e.end,E,60*60*1e3),L=await this._fetchStats(c,e.start,e.end,w),this._token!==o))return;let it=await this._fetchStats(W,e.start,e.end,S);if(this._token!==o)return;let rt={...it||{},...L||{}},R={};Object.keys(rt||{}).forEach(l=>{R[l]=this._normalizeStatsSeries(rt[l])});let A=await this._fetchStats(b.price,e.start,e.end,"hour",["mean"]);if(this._token!==o)return;let Te={};Object.keys(A||{}).forEach(l=>{Te[l]=this._normalizePriceSeries(A[l])});let Pt=await this._fetchStats(b.temperature,e.start,e.end,"hour",["mean"]);if(this._token!==o)return;let Me={};Object.keys(Pt||{}).forEach(l=>{Me[l]=this._normalizePriceSeries(Pt[l])}),this._costUnit="",this._priceUnit="",this._temperatureUnit="";let Re=[...b.importCost,...b.exportCompensation,...b.price,...b.temperature];if(Re.length)try{let l=await this._fetchStatsMetadata(Re);if(this._token!==o)return;let f=[...b.importCost,...b.exportCompensation].map(k=>l[k]?.statistics_unit_of_measurement).find(k=>typeof k=="string"&&k.length),C=b.price.map(k=>l[k]).find(k=>k?.statistics_unit_of_measurement),N=b.temperature.map(k=>l[k]).find(k=>k?.statistics_unit_of_measurement);f&&(this._costUnit=f),C?.statistics_unit_of_measurement&&(this._priceUnit=C.statistics_unit_of_measurement),N?.statistics_unit_of_measurement&&(this._temperatureUnit=N.statistics_unit_of_measurement)}catch{this._costUnit="",this._priceUnit="",this._temperatureUnit=""}let ee=new Map,T=x.map((l,f)=>{let C=l.stat,N=u?.[C]?.statistics_unit_of_measurement,k=this._energyUnitConversionFactor(N,this._energyUnit)||1,nt=this._bucketSeries(this._normalizeStatsSeriesWithFactor(L[C],k),m);this._mergeInto(ee,nt);let J=this._getGraphColorByIndex(f);return{id:`adaptive-${C}`,name:this._resolveItemizationName(l,u?.[C]),type:"bar",stack:"consumption",barMaxWidth:50,color:J,itemStyle:{borderColor:J,borderWidth:1,borderRadius:[4,4,0,0],opacity:.5},data:[],__bucketMap:nt}}),st=m<$?$:m,ie=new Map,re=new Map,se=new Map,ne=new Map,oe=new Map;v.fromGrid.forEach(l=>this._mergeInto(ie,this._bucketSeries(R[l]||[],st))),v.toGrid.forEach(l=>this._mergeInto(re,this._bucketSeries(R[l]||[],st))),v.solar.forEach(l=>this._mergeInto(se,this._bucketSeries(R[l]||[],st))),v.fromBattery.forEach(l=>this._mergeInto(ne,this._bucketSeries(R[l]||[],st))),v.toBattery.forEach(l=>this._mergeInto(oe,this._bucketSeries(R[l]||[],st)));let ze=new Map;new Set([...ie.keys(),...re.keys(),...se.keys(),...ne.keys(),...oe.keys()]).forEach(l=>{let f=Math.max(ie.get(l)||0,0)+Math.max(se.get(l)||0,0)+Math.max(ne.get(l)||0,0)-Math.max(re.get(l)||0,0)-Math.max(oe.get(l)||0,0);ze.set(l,f)});let ae=new Map;ee.forEach((l,f)=>{let C=this._bucketStart(f,st);ae.set(C,(ae.get(C)||0)+l)});let{totalConsumedByBucket:Dt,untrackedByBucket:ce}=vi({usedTotalByMathBucket:ze,deviceTotalsByMathBucket:ae,bucketMs:m,flowBucketMs:$}),Fe=new Set([...Array.from(ce.keys()),...Array.from(Dt.keys())]);T.forEach(l=>{(l.__bucketMap||new Map).forEach((C,N)=>Fe.add(N))});let Oe=Array.from(Fe).sort((l,f)=>l-f),Le=Oe.map(l=>[l,ce.get(l)||0]);T.forEach(l=>{let f=l.__bucketMap||new Map;l.data=Oe.map(C=>[C,f.get(C)||0]),delete l.__bucketMap});let Ue=this._getUntrackedColor();T.push({id:"adaptive-untracked",name:"Untracked",type:"bar",stack:"consumption",barMaxWidth:50,color:Ue,itemStyle:{borderColor:Ue,borderWidth:1,borderRadius:[4,4,0,0],opacity:.5},data:Le});let le=new Map;b.importCost.forEach(l=>{this._mergeInto(le,this._bucketSeries(R[l]||[],m))}),b.exportCompensation.forEach(l=>{let f=new Map;this._bucketSeries(R[l]||[],m).forEach((C,N)=>{f.set(N,-C)}),this._mergeInto(le,f)});let It=Array.from(le.entries()).map(([l,f])=>[l,f]).sort((l,f)=>l[0]-f[0]),Be=new Map,He=new Map;b.price.forEach(l=>{this._accumulateSeriesAverage(Te[l]||[],m,Be,He)});let Nt=Array.from(Be.entries()).map(([l,f])=>[l,f/Math.max(1,He.get(l)||1)]).sort((l,f)=>l[0]-f[0]),Ve=new Map,qe=new Map;b.temperature.forEach(l=>{this._accumulateSeriesAverage(Me[l]||[],m,Ve,qe)});let Tt=Array.from(Ve.entries()).map(([l,f])=>[l,f/Math.max(1,qe.get(l)||1)]).sort((l,f)=>l[0]-f[0]);if(this._costAxisDigits=ht(It.map(l=>Number(l[1]))),this._priceAxisDigits=ht(Nt.map(l=>Number(l[1]))),this._temperatureAxisDigits=ht(Tt.map(l=>Number(l[1]))),It.length){let l=this._getCostColor();T.push({id:"adaptive-cost-overlay",name:"Cost",type:"line",smooth:.2,symbol:"none",showSymbol:!1,yAxisIndex:1,z:80,lineStyle:{width:2,color:l},itemStyle:{color:l},data:It})}if(Nt.length){let l=this._getPriceColor();T.push({id:"adaptive-price-overlay",name:"Price",type:"line",smooth:.05,symbol:"none",showSymbol:!1,yAxisIndex:2,z:79,lineStyle:{width:2,type:"dashed",color:l},itemStyle:{color:l},data:Nt})}if(Tt.length){let l=this._getTemperatureColor(),f=i?.temperature_override?"Temperature (override)":"Temperature";T.push({id:"adaptive-temperature-overlay",name:f,type:"line",smooth:.1,symbol:"none",showSymbol:!1,yAxisIndex:3,z:78,lineStyle:{width:2,type:"dotted",color:l},itemStyle:{color:l},data:Tt})}if(!T.some(l=>Array.isArray(l.data)&&l.data.length)){let l=(this._rangeAttemptCounts?.[r]||0)+1;if(this._rangeAttemptCounts={...this._rangeAttemptCounts||{},[r]:l},l<2){this._queueRetryForRange(r);return}this._showCardError("No consumption data available for the selected range.");return}this._rangeAttemptCounts={...this._rangeAttemptCounts||{},[r]:0};let je=this._hass?.locale?.language||"en",Ge=e.end.getTime()-e.start.getTime(),er=m>=24*60*60*1e3?"1d":m>=60*60*1e3?`${Math.round(m/(60*60*1e3))}h`:"15m",ir={grid:{top:20,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!1,type:"custom",data:[{id:"adaptive-total",secondaryIds:[],name:"Total",itemStyle:{color:"var(--primary-text-color)",borderColor:"var(--primary-text-color)"}},...T.map(l=>{let f=l?.itemStyle?.color||l?.lineStyle?.color||l?.itemStyle?.borderColor||l?.color;return{id:l.id,secondaryIds:[],name:l.name,itemStyle:{color:f,borderColor:f}}})]},xAxis:{type:"time",axisLabel:{formatter:l=>this._formatBucketLabel(Number(l),m,Ge,je)}},yAxis:[{type:"value",axisLabel:{formatter:l=>this._energyUnit?`${l} ${this._energyUnit}`:`${l}`}},{type:"value",position:"right",splitLine:{show:!1},axisLabel:{formatter:l=>this._formatCostAxisValue(l)}},{type:"value",position:"right",offset:56,splitLine:{show:!1},axisLabel:{formatter:l=>this._formatPriceAxisValue(l)}},{type:"value",position:"right",offset:112,splitLine:{show:!1},axisLabel:{formatter:l=>this._formatTemperatureAxisValue(l)}}],tooltip:{show:!0,trigger:"axis",formatter:l=>{let f=Array.isArray(l)?l:[l];if(!f.length)return"";let C=Array.isArray(f[0].value)?f[0].value[0]:f[0].value,N=this._bucketStart(Number(C),m),k=`${this._formatBucketLabel(N,m,Ge,je)} (${er})`,nt=Number(Dt.get(N)||0),J=this._formatEnergyStatValue(nt),z=f.filter(D=>Array.isArray(D.value)&&Math.abs(Number(D.value[1])||0)>0).map(D=>{let H=Number(D.value[1]),nr=D.seriesId==="adaptive-cost-overlay"?this._formatCostValue(H):D.seriesId==="adaptive-price-overlay"?this._formatPriceValue(H):D.seriesId==="adaptive-temperature-overlay"?this._formatTemperatureValue(H):this._energyUnit?`${H.toFixed(2)} ${this._energyUnit}`:`${H.toFixed(2)}`;return{marker:D.marker,color:D.color,name:D.seriesName,value:nr}});if(ut(this._hass?.config?.version,"2026.6.0")){let D="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;";return q`
              <h4 style="text-align: center; margin: 0;">${k}</h4>
              Total: <span style="direction:ltr; display: inline;">${J}</span>
              ${z.map(H=>q`<br /><span style="${D}background-color:${H.color};"></span>
                  ${H.name}: <span style="direction:ltr; display: inline;">${H.value}</span>`)}
            `}let yt=`Total: <div style="direction:ltr; display: inline;">${J}</div>`,Ke=z.map(D=>`${D.marker} ${D.name}: <div style="direction:ltr; display: inline;">${D.value}</div>`).join("<br>");return`<h4 style="text-align: center; margin: 0;">${k}</h4>${yt}${Ke?`<br>${Ke}`:""}`}}},rr=T.map(l=>{let f=(Array.isArray(l?.data)?l.data:[]).map(z=>Array.isArray(z)?Number(z[1]):NaN).filter(z=>Number.isFinite(z)),C=f.length?Math.min(...f):0,N=f.length?Math.max(...f):0,k=f.length?f.reduce((z,yt)=>z+yt,0)/f.length:0,nt=f.length?f.reduce((z,yt)=>z+yt,0):0,J=f.length?f[f.length-1]:0,Y="energy";return l.id==="adaptive-cost-overlay"?Y="cost":l.id==="adaptive-price-overlay"?Y="price":l.id==="adaptive-temperature-overlay"&&(Y="temperature"),{id:l.id||"",name:l.name||"",color:l?.itemStyle?.color||l?.lineStyle?.color||l?.itemStyle?.borderColor||l?.color||"var(--primary-color)",min:C,max:N,avg:k,sum:Y==="price"||Y==="temperature"?null:nt,last:J,kind:Y}}),M=Array.from(Dt.values()).filter(l=>Number.isFinite(l)),sr={id:"",name:"Total",color:"var(--primary-text-color)",min:M.length?Math.min(...M):0,max:M.length?Math.max(...M):0,avg:M.length?M.reduce((l,f)=>l+f,0)/M.length:0,sum:M.length?M.reduce((l,f)=>l+f,0):0,last:M.length?M[M.length-1]:0,kind:"energy"};this._allSeries=T,this._chartOptions=ir,this._legendRows=[sr,...rr],this._debugEnabled&&(this._latestAdaptiveExportData={generated_at:new Date().toISOString(),collection_key:this._getCollectionKey(),range:{start:e.start.toISOString(),end:e.end.toISOString()},bucket_ms:m,period:{device:w,flow_and_cost:S,price:"hour",temperature:"hour"},ids:{device:c,flow:v,overlay:b},metadata:{energy:u,units:{energy:this._energyUnit,cost:this._costUnit,price:this._priceUnit,temperature:this._temperatureUnit}},raw:{device:L,flow_and_cost:it,price:A,temperature:Pt},computed:{total_consumed_by_bucket:this._serializeMap(Dt),device_totals_by_bucket:this._serializeMap(ee),untracked_by_bucket:this._serializeMap(ce)},series:T}),this._initializeSeriesVisibility(T),this._logAdaptiveGraphDebug({updateMeta:this._lastUpdateMeta||{primaryTrigger:this._lastUpdateTrigger||"unspecified",finalTrigger:this._lastUpdateTrigger||"unspecified",triggerChain:[this._lastUpdateTrigger||"unspecified"],triggerContexts:{}},bounds:e,bucketMs:m,devicePeriod:w,flowPeriod:S,deviceIds:c,flowAndCostIds:W,flowIds:v,overlayIds:b,deviceRaw:L,flowRaw:it,priceRaw:A,temperatureRaw:Pt,series:T,costPoints:It,pricePoints:Nt,temperaturePoints:Tt,untrackedPoints:Le}),this._pendingRetryRangeKey=null,this._setLoadingState(!1),this._lastRenderedUpdateSignature=s,this._applySeriesVisibility()}catch(t){let e=t?.message||String(t);this._showCardError(`Failed to render adaptive graph: ${e}`)}}};var qt=class extends HTMLElement{setConfig(t){this._config=t||{},this._resolvedMetrics=this._config.resolved_metrics||{},this._debugEnabled=this._config.debug===!0,pt("future_price",this._config),this._debugEnabled||(this._lastFuturePriceDebugStatus=void 0),this.shadowRoot||this.attachShadow({mode:"open"}),this._renderBase()}set hass(t){this._hass=t,this._trySubscribe(),this._ensureChart()}connectedCallback(){!this._resizeObserver&&typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleUpdate()),this._resizeObserver.observe(this)),this._scheduleNowTick()}disconnectedCallback(){this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0),this._clearNowTick(),this._unbindShadeFromChart()}getCardSize(){return 3}_renderBase(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        ha-card { height: 100%; }
        .card-header { padding-bottom: 0; }
        .content { padding: 16px; }
        .content.has-header { padding-top: 0; }
        .empty {
          color: var(--secondary-text-color);
          user-select: text;
          -webkit-user-select: text;
          cursor: text;
          white-space: pre-wrap;
        }
        .chart-wrap {
          position: relative;
          isolation: isolate;
        }
        .chart-wrap ha-chart-base {
          position: relative;
          z-index: 3;
          pointer-events: auto;
        }
        .tomorrow-shade {
          position: absolute;
          pointer-events: none !important;
          user-select: none;
          display: none;
          z-index: 0;
        }
        .now-indicator {
          position: absolute;
          pointer-events: none !important;
          user-select: none;
          display: none;
          z-index: 4;
          border-left: 2px solid color-mix(in srgb, var(--error-color) 80%, white);
        }
        .now-indicator.offscreen {
          border-left-color: transparent;
        }
        .now-indicator-label {
          position: absolute;
          top: 4px;
          left: 6px;
          font-size: var(--ha-font-size-xs);
          font-weight: 600;
          color: color-mix(in srgb, var(--error-color) 80%, white);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .now-indicator-time {
          display: block;
          margin-top: 2px;
          font-size: var(--ha-font-size-2xs);
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: none;
        }
        .now-indicator-hint {
          display: block;
          margin-top: 2px;
          font-size: 2.5em;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-transform: none;
        }
        .now-indicator.offscreen-right .now-indicator-label {
          left: auto;
          right: 6px;
          text-align: right;
        }
        .now-indicator.offscreen .now-indicator-time {
          opacity: 0.8;
        }
        .day-shade-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - 8px);
          text-align: center;
          font-size: var(--ha-font-size-xs);
          color: transparent;
          -webkit-text-stroke: 0;
          text-shadow: 0 0 0 var(--card-background-color);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
          pointer-events: none !important;
        }
        .stats {
          margin-top: 12px;
          border-top: 1px solid var(--divider-color);
          padding-top: 10px;
          font-size: var(--ha-font-size-s);
          color: var(--primary-text-color);
        }
        .stats table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .stats th,
        .stats td {
          padding: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stats th {
          color: var(--secondary-text-color);
          font-weight: 500;
        }
        .stats .series {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .stats .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid currentColor;
          flex: 0 0 auto;
        }
        .stats .label {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stats th.num,
        .stats td.num {
          text-align: right;
        }
        .stats tr.toggleable {
          cursor: pointer;
        }
        .stats tr.hidden {
          color: var(--secondary-text-color);
        }
        .stats tr.hidden .dot {
          background: transparent !important;
        }
      </style>
      <ha-card>
        ${this._config?.title?`<h1 class="card-header">${this._config.title}</h1>`:""}
        <div class="content ${this._config?.title?"has-header":""}">
          <div id="chart-wrap" class="chart-wrap">
            <ha-chart-base id="chart"></ha-chart-base>
            <div id="today-shade" class="tomorrow-shade">
              <span class="day-shade-label">Today</span>
            </div>
            <div id="tomorrow-shade" class="tomorrow-shade">
              <span class="day-shade-label">Tomorrow</span>
            </div>
            <div id="now-indicator" class="now-indicator">
              <span class="now-indicator-label">Now<span id="now-indicator-time" class="now-indicator-time"></span><span id="now-indicator-hint" class="now-indicator-hint"></span></span>
            </div>
          </div>
          <div id="empty" class="empty" style="display:none;">No data</div>
          <div id="stats" class="stats"></div>
        </div>
      </ha-card>
    `,this._ensureChart())}_ensureChart(){this.shadowRoot&&(this._chart=this.shadowRoot.querySelector("#chart"),this._chart&&this._hass&&(this._chart.hass=this._hass,this._chart.height="280px"))}_getCollection(){let t=this._config?.collection_key||I;return this._hass?.connection?.[`_${t}`]}_trySubscribe(){let t=this._getCollection();!t||t===this._collection||!t.subscribe||(this._unsubscribe&&this._unsubscribe(),this._collection=t,this._unsubscribe=t.subscribe(e=>{this._energyData=e,this._scheduleUpdate()}))}_scheduleUpdate(){this._updateScheduled||(this._updateScheduled=!0,requestAnimationFrame(()=>{this._updateScheduled=!1,this._updateChart()}))}_scheduleNowTick(){this._clearNowTick(),this._nowTickInterval=setInterval(()=>{this._applyTomorrowShadeGraphic()},6e4)}_clearNowTick(){this._nowTickInterval&&(clearInterval(this._nowTickInterval),this._nowTickInterval=void 0)}_fetchStats(t,e,i,r,s){return t.length?this._hass.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),end_time:i.toISOString(),statistic_ids:t,period:r,types:s}):Promise.resolve({})}_fetchStatsMetadata(t){let e=Array.from(new Set((t||[]).filter(Boolean)));return e.length?this._hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e}).then(i=>{let r={};return(i||[]).forEach(s=>{s?.statistic_id&&(r[s.statistic_id]=s)}),r}):Promise.resolve({})}_normalizeMaxSeries(t){return Array.isArray(t)?t.map(e=>{let i=typeof e?.start=="number"?e.start:typeof e?.start=="string"?Date.parse(e.start):NaN,r=Number(e?.max);return!Number.isFinite(i)||!Number.isFinite(r)?null:[i,r]}).filter(Boolean).sort((e,i)=>e[0]-i[0]):[]}_getFixedRange(){let t=new Date;t.setHours(0,0,0,0);let e=new Date(t);return e.setDate(e.getDate()+1),e.setHours(23,59,59,999),{start:t,end:e}}_formatDate(t){let e=this._hass?.locale?.language||"en";return new Date(t).toLocaleDateString(e,{day:"2-digit",month:"short"})}_formatHourRange(t){let e=new Date(t),i=new Date(t+60*60*1e3),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}-${r(i.getHours())}`}_formatBucketLabel(t){return`${this._formatDate(t)} ${this._formatHourRange(t)}`}_formatClock(t){let e=new Date(t),i=r=>String(r).padStart(2,"0");return`${i(e.getHours())}:${i(e.getMinutes())}`}_getNowForecastValue(t){if(!Array.isArray(t)||!t.length)return 0;let e=Date.now(),i=new Date(e);i.setMinutes(0,0,0);let r=i.getTime(),s=t.find(c=>Number(c?.[0])===r);if(s&&Number.isFinite(Number(s[1])))return Number(s[1]);let o=[...t].filter(c=>Number.isFinite(Number(c?.[0]))&&Number(c[0])<=e).sort((c,d)=>Number(d[0])-Number(c[0]))[0];if(o&&Number.isFinite(Number(o[1])))return Number(o[1]);let a=t[t.length-1];return Number.isFinite(Number(a?.[1]))?Number(a[1]):0}_formatPriceValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=new Intl.NumberFormat(i,{minimumFractionDigits:1,maximumFractionDigits:1}).format(e);return this._priceUnit?`${r} ${this._priceUnit}`:r}_formatPriceAxisValue(t){let e=typeof t=="number"?t:Number(t||0),i=this._hass?.locale?.language||"en",r=this._priceAxisDigits||0,s=new Intl.NumberFormat(i,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),o=(this._priceUnit||"").split("/")[0].trim();return o?`${s} ${o}`:s}_getPriceForecastColor(t=0){let e=getComputedStyle(this),i=[e.getPropertyValue("--info-color").trim()||"#2f7ed8",e.getPropertyValue("--warning-color").trim()||"#f59e0b",e.getPropertyValue("--success-color").trim()||"#16a34a",e.getPropertyValue("--accent-color").trim()||"#0ea5e9",e.getPropertyValue("--error-color").trim()||"#ef4444"];return i[t%i.length]}_toggleSeriesVisibility(t){this._hiddenSeriesIds||(this._hiddenSeriesIds=new Set),this._hiddenSeriesIds.has(t)?this._hiddenSeriesIds.delete(t):this._hiddenSeriesIds.add(t),this._applySeriesVisibility()}_renderLegendTable(t,e){let i=this.shadowRoot?.querySelector("#stats");i&&(i.innerHTML=`
      <table>
        <thead>
          <tr>
            <th>Series</th>
            <th class="num">Min</th>
            <th class="num">Max</th>
            <th class="num">Avg</th>
            <th class="num">Now</th>
          </tr>
        </thead>
        <tbody>
          ${(t||[]).map(r=>`
            <tr class="${r.id&&e?.has(r.id)?"hidden":""}">
              <td><span class="series"><span class="dot" style="color: ${r.color}; background-color: ${r.color};"></span><span class="label">${r.name}</span></span></td>
              <td class="num">${this._formatPriceValue(r.min)}</td>
              <td class="num">${this._formatPriceValue(r.max)}</td>
              <td class="num">${this._formatPriceValue(r.avg)}</td>
              <td class="num">${this._formatPriceValue(r.now??r.last)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `)}_applySeriesVisibility(){if(!this._chart||!this._allSeries||!this._chartOptions)return;let t=this._hiddenSeriesIds||new Set,e=this._allSeries.filter(r=>!t.has(r.id)),i=this.shadowRoot?.querySelector("#empty");i&&(i.style.display=e.some(r=>r.data?.length)?"none":"block"),this._chart.hass=this._hass,this._chart.data=e,this._chart.options=this._chartOptions,this._chart.requestUpdate?.(),this._bindShadeToChart(),requestAnimationFrame(()=>this._applyTomorrowShadeGraphic()),this._renderLegendTable(this._legendRows||[],t)}_bindShadeToChart(){if(!this.isConnected)return;let t=this._chart?.chart;if(!t){requestAnimationFrame(()=>this._bindShadeToChart());return}this._shadeBoundChart!==t&&(this._unbindShadeFromChart(),this._shadeFinishedHandler=()=>this._applyTomorrowShadeGraphic(),t.on("finished",this._shadeFinishedHandler),this._shadeBoundChart=t)}_unbindShadeFromChart(){this._shadeBoundChart&&this._shadeFinishedHandler&&this._shadeBoundChart.off("finished",this._shadeFinishedHandler),this._shadeBoundChart=void 0,this._shadeFinishedHandler=void 0}_applyTomorrowShadeGraphic(){let t=this._chart?.chart;if(!t||!Number.isFinite(this._tomorrowStartMs))return;let e=this.shadowRoot?.querySelector("#today-shade"),i=this.shadowRoot?.querySelector("#tomorrow-shade"),r=this.shadowRoot?.querySelector("#now-indicator"),s=this.shadowRoot?.querySelector("#now-indicator-time"),o=this.shadowRoot?.querySelector("#now-indicator-hint");if(!e||!i||!r)return;let a=e.querySelector(".day-shade-label"),c=i.querySelector(".day-shade-label"),d=()=>{e.style.display="none",i.style.display="none",r.style.display="none",r.classList.remove("offscreen","offscreen-left","offscreen-right"),o&&(o.textContent="")};if(!Array.isArray(this._allSeries)||!this._allSeries.length){d();return}let h=t.getModel()?.getComponent?.("grid",0)?.coordinateSystem?.getRect?.();if(!h){d();return}let _=Number(t.convertToPixel({xAxisIndex:0},this._tomorrowStartMs));if(!Number.isFinite(_)){d();return}if(h.width<=0||h.height<=0){d();return}let p=Math.max(h.x,Math.min(h.x+h.width,_)),y=Math.max(0,p-h.x),x=Math.max(0,h.x+h.width-p),g=this._hass?.themes?.darkMode??(typeof window<"u"&&window.matchMedia?.("(prefers-color-scheme: dark)")?.matches),b=g?"rgba(34, 197, 94, 0.07)":"rgba(148, 163, 184, 0.12)",v=g?"rgba(250, 204, 21, 0.11)":"rgba(100, 116, 139, 0.16)",E=Math.max(12,Math.round(h.height*.25));a&&(a.style.fontSize=`${E}px`),c&&(c.style.fontSize=`${E}px`),y>0?(e.style.display="block",e.style.left=`${h.x}px`,e.style.top=`${h.y}px`,e.style.width=`${y}px`,e.style.height=`${h.height}px`,e.style.background=b):e.style.display="none",x>0?(i.style.display="block",i.style.left=`${p}px`,i.style.top=`${h.y}px`,i.style.width=`${x}px`,i.style.height=`${h.height}px`,i.style.background=v):i.style.display="none";let m=Date.now();if(Number.isFinite(this._rangeStartMs)&&Number.isFinite(this._rangeEndMs)&&m>=this._rangeStartMs&&m<=this._rangeEndMs){let w=Number(t.convertToPixel({xAxisIndex:0},m));if(Number.isFinite(w)){if(r.style.display="block",r.style.top=`${h.y}px`,r.style.height=`${h.height}px`,s&&(s.textContent=this._formatClock(m)),w<h.x){r.classList.add("offscreen","offscreen-left"),r.classList.remove("offscreen-right"),r.style.left=`${h.x}px`,o&&(o.textContent="\u2190");return}if(w>h.x+h.width){r.classList.add("offscreen","offscreen-right"),r.classList.remove("offscreen-left"),r.style.left=`${h.x+h.width}px`,o&&(o.textContent="\u2192");return}r.classList.remove("offscreen","offscreen-left","offscreen-right"),r.style.left=`${w}px`,o&&(o.textContent="")}else r.style.display="none",r.classList.remove("offscreen","offscreen-left","offscreen-right"),o&&(o.textContent="")}else r.style.display="none",r.classList.remove("offscreen","offscreen-left","offscreen-right"),o&&(o.textContent="")}_formatDebugTime(t){if(!Number.isFinite(t))return null;let e=new Date(t);return{ts:t,iso:e.toISOString(),local:e.toString()}}_logFuturePriceDebug(t){if(!this._debugEnabled)return;let e=t?.result?.status||"unknown";e!==this._lastFuturePriceDebugStatus&&(this._lastFuturePriceDebugStatus=e,Mi({source:"future_price",payload:t}))}_showCardError(t){let e=this.shadowRoot?.querySelector("#empty");e&&(e.textContent=t,e.style.display="block"),this._allSeries=[],this._chartOptions={legend:{show:!1,type:"custom"},xAxis:{type:"time"},yAxis:[{type:"value",position:"right",splitLine:{show:!1}}],tooltip:{show:!1}},this._legendRows=[],this._chart&&(this._chart.hass=this._hass,this._chart.data=[],this._chart.options=this._chartOptions,this._chart.requestUpdate?.());let i=this.shadowRoot?.querySelector("#today-shade"),r=this.shadowRoot?.querySelector("#tomorrow-shade"),s=this.shadowRoot?.querySelector("#now-indicator");i&&(i.style.display="none"),r&&(r.style.display="none"),s&&(s.style.display="none"),this._renderLegendTable([],this._hiddenSeriesIds||new Set)}async _updateChart(){if(!this._hass||(this._ensureChart(),!this._chart))return;let t=this._resolvedMetrics||{},e=typeof t.future_price_error=="string"&&t.future_price_error.trim()?t.future_price_error.trim():null,i=Array.isArray(t.price_forecast)?t.price_forecast.filter(s=>typeof s=="string"&&s.length):[],r={resolvedMetrics:{forecastIds:i},fetch:{requestedIds:[],pointCounts:{},metadataUnit:""},result:{status:"pending"}};try{if(e){r.result={status:"forecast_error",message:e},this._logFuturePriceDebug(r),this._showCardError(e);return}if(!i.length){r.result={status:"no_area_ids",message:"No Fortum price forecast statistics configured."},this._logFuturePriceDebug(r),this._showCardError("No Fortum price forecast statistics configured.");return}let{start:s,end:o}=this._getFixedRange();this._rangeStartMs=s.getTime(),this._rangeEndMs=o.getTime();let a=(this._token||0)+1;this._token=a,r.range={start:this._formatDebugTime(s.getTime()),end:this._formatDebugTime(o.getTime())},r.fetch.requestedIds=i;let c=await this._fetchStats(i,s,o,"hour",["max"]);if(this._token!==a)return;let d={};i.forEach(g=>{d[g]=this._normalizeMaxSeries(c?.[g]),r.fetch.pointCounts[g]=d[g].length}),this._priceUnit="";let u={};try{if(u=await this._fetchStatsMetadata(i),this._token!==a)return;let g=i.map(b=>u?.[b]?.statistics_unit_of_measurement).find(b=>typeof b=="string");this._priceUnit=typeof g=="string"?g:"",r.fetch.metadataUnit=this._priceUnit}catch{this._priceUnit="",u={},r.fetch.metadataError=!0}let h=[],_=[],p=[];if(i.forEach((g,b)=>{let v=d[g]||[],E=this._getPriceForecastColor(b),m=`future-price-overlay-${b}`,w=bi(g,b),S=v.map($=>Number($[1])).filter($=>Number.isFinite($));p.push(...S),h.push({id:m,name:w,type:"line",smooth:.05,symbol:"none",showSymbol:!1,yAxisIndex:0,z:10,lineStyle:{width:2,type:"dashed",color:E},itemStyle:{color:E},data:v}),_.push({id:m,name:w,color:E,min:S.length?Math.min(...S):0,max:S.length?Math.max(...S):0,avg:S.length?S.reduce(($,W)=>$+W,0)/S.length:0,now:this._getNowForecastValue(v)})}),!h.some(g=>Array.isArray(g.data)&&g.data.length)){let g=i.length===1?`Price statistic ${i[0]} has no values for the selected range.`:"No forecast price data available for configured Fortum sources.";r.result={status:"no_points",message:g},this._logFuturePriceDebug(r),this._showCardError(g);return}this._priceAxisDigits=ht(p);let y=new Date(s);y.setDate(y.getDate()+1);let x={grid:{top:20,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!1,type:"custom"},xAxis:{type:"time",min:s,max:o,axisLabel:{formatter:g=>this._formatClock(Number(g))}},yAxis:[{type:"value",position:"right",splitLine:{show:!1},axisLabel:{formatter:g=>this._formatPriceAxisValue(g)}}],tooltip:{show:!0,trigger:"axis",formatter:g=>{let b=Array.isArray(g)?g:[g];if(!b.length)return"";let v=Array.isArray(b[0].value)?b[0].value[0]:b[0].value,E=this._formatClock(Number(v)),m=b.filter(S=>Array.isArray(S.value)).map(S=>{let $=Number(S.value[1]);return{marker:S.marker,color:S.color,name:S.seriesName,value:this._formatPriceValue($)}});if(ut(this._hass?.config?.version,"2026.6.0")){let S="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;";return q`
              <h4 style="text-align: center; margin: 0;">${E}</h4>
              ${m.map($=>q`<span style="${S}background-color:${$.color};"></span>
                  ${$.name}: <span style="direction:ltr; display: inline;">${$.value}</span><br />`)}
            `}let w=m.map(S=>`${S.marker} ${S.name}: <div style="direction:ltr; display: inline;">${S.value}</div>`).join("<br>");return`<h4 style="text-align: center; margin: 0;">${E}</h4>${w}`}}};this._allSeries=h,this._chartOptions=x,this._legendRows=_,this._tomorrowStartMs=y.getTime(),r.result={status:"ok",seriesCount:h.length,legendRows:_.map(g=>g.id)},this._logFuturePriceDebug(r),this._applySeriesVisibility()}catch(s){let o=s?.message||String(s);r.result={status:"error",message:o},this._logFuturePriceDebug(r),this._showCardError(`Failed to load forecast prices: ${o}`)}}};var zi=0,Rr=(n,t,e,i)=>{let r=n instanceof Date?n.getTime():null,s=e instanceof Date?e.getTime():null,o=t instanceof Date?t.getTime():null,a=i instanceof Date?i.getTime():null;return r===s&&o===a},zr=()=>{let n=new Date;n.setHours(0,0,0,0);let t=new Date(n);return t.setHours(23,59,59,999),{start:n,end:t}},Fr=n=>{try{let t=localStorage.getItem(`${de}${n}`);if(!t)return null;let e=JSON.parse(t),i=Number(e?.start),r=Number(e?.end);return!Number.isFinite(i)||!Number.isFinite(r)||r<=i?null:{start:new Date(i),end:new Date(r)}}catch{return null}},Or=(n,t,e)=>{!(t instanceof Date)||!(e instanceof Date)||localStorage.setItem(`${de}${n}`,JSON.stringify({start:t.getTime(),end:e.getTime()}))},Fi=(n,t)=>{let e=n?.connection?.[`_${t}`];if(!e||typeof e.setPeriod!="function")return;if(!e.__myEnergyRangePatched){let s=e.setPeriod.bind(e);e.setPeriod=(o,a)=>{s(o,a),o instanceof Date&&a instanceof Date&&(Or(t,o,a),typeof window<"u"&&typeof window.dispatchEvent=="function"&&(zi+=1,window.dispatchEvent(new CustomEvent("fortum-energy:range-changed",{detail:{collectionKey:t,start:o.getTime(),end:a.getTime(),source:"range_persistence_set_period_patch",rangeChangeSequence:zi,changedAt:new Date().toISOString()}}))))},e.__myEnergyRangePatched=!0}if(e.__myEnergyRangeInitialized)return;e.__myEnergyRangeInitialized=!0;let r=Fr(t)||zr();Rr(e.start,e.end,r.start,r.end)||(e.setPeriod(r.start,r.end),typeof e.refresh=="function"&&e.refresh())};var jt=class extends HTMLElement{setConfig(t){this._config=t||{},pt("quick_ranges",this._config),this.shadowRoot||this.attachShadow({mode:"open"}),this._render()}set hass(t){let e=this._hass?.locale?.language!==t?.locale?.language;this._hass=t;let i=this._config?.collection_key||I;Fi(t,i),(!this._rendered||e)&&this._render()}getCardSize(){return 1}_setDefaultRange(t){let e=this._config?.collection_key||I,i=this._hass?.connection?.[`_${e}`],s=(()=>{let d=i?.start instanceof Date?i.start:null,u=i?.end instanceof Date?i.end:null;return!d||!u?new Date:new Date((d.getTime()+u.getTime())/2)})();s.setHours(12,0,0,0);let o=d=>{let u=Math.floor((d-1)/2),h=new Date(s);h.setDate(s.getDate()-u),h.setHours(0,0,0,0);let _=new Date(h);return _.setDate(h.getDate()+d-1),_.setHours(23,59,59,999),{start:h,end:_}},a,c;if(t==="month"?{start:a,end:c}=o(31):t==="week"?{start:a,end:c}=o(7):{start:a,end:c}=o(1),i&&i.setPeriod&&i.refresh){i.setPeriod(a,c),i.refresh();return}window.location.reload()}_render(){if(!this.shadowRoot||!this._hass)return;let t="Day",e="Week",i="Month";this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          height: 100%;
        }
        .card {
          background: var(--ha-card-background, var(--card-background-color));
          border-radius: var(--ha-card-border-radius, 12px);
          border: 1px solid var(--divider-color);
          box-sizing: border-box;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .row {
          display: flex;
          gap: 8px;
          padding: 8px 12px;
          align-items: center;
          width: 100%;
        }
        ha-button {
          flex: 1;
          --ha-button-theme-color: currentColor;
        }
        ha-button.export {
          flex: 0 0 auto;
          min-width: 92px;
        }
      </style>
      <div class="card">
        <div class="row">
          <ha-button appearance="filled" size="small" data-range="day">${t}</ha-button>
          <ha-button appearance="filled" size="small" data-range="week">${e}</ha-button>
          <ha-button appearance="filled" size="small" data-range="month">${i}</ha-button>
          ${this._config?.debug===!0?'<ha-button class="export" appearance="outlined" size="small" data-range="export">Export Debug</ha-button>':""}
        </div>
      </div>
    `,this._boundClick||(this._boundClick=r=>{let s=r.target;if(!(s instanceof Element))return;let o=s.closest("ha-button");if(!o)return;let a=o.getAttribute("data-range");if(a){if(a==="export"){let c=this._config?.collection_key||I;window.dispatchEvent(new CustomEvent("fortum-energy:export-debug-info",{detail:{collectionKey:c,download:!0}}));return}this._setDefaultRange(a)}},this.shadowRoot.addEventListener("click",this._boundClick)),this._rendered=!0}};Ie();Ne();var Yt=class extends HTMLElement{setConfig(t){}getCardSize(){return 1}getGridOptions(){return{rows:1,columns:4}}connectedCallback(){this.style.display="block",this.style.height="100%",this.style.pointerEvents="none"}};kt();var Wi=/^fortum:hourly_consumption_[a-z0-9_]+$/i,jr=/^fortum:price_forecast_[a-z0-9_]+$/i,Gr=(n,t)=>Object.prototype.hasOwnProperty.call(n||{},t),Ji=n=>Array.from(new Set((Array.isArray(n)?n:[]).map(t=>typeof t=="string"?t:t?.statistic_id).filter(t=>typeof t=="string"&&t.length))),Kr=n=>{let t=String(n||"").trim().toLowerCase().replace(/[^0-9a-z_]/g,"_").replace(/^_+|_+$/g,"");if(!t)throw new Error("Invalid metering_point.number value.");return t},Zt=(n,t)=>`fortum:hourly_${n}_${Kr(t)}`,Wr=n=>{if(typeof n!="string"||!Wi.test(n))throw new Error(`Invalid Fortum consumption statistic id: ${n||"<empty>"}`);return{consumption:n,cost:n.replace("hourly_consumption_","hourly_cost_"),price:n.replace("hourly_consumption_","hourly_price_"),temperature:n.replace("hourly_consumption_","hourly_temperature_")}},Jr=n=>(Array.isArray(n)?n:[]).map(t=>{if(!t||typeof t!="object")return null;let e=typeof t.stat=="string"?t.stat.trim():"";if(!e)return null;let i=typeof t.name=="string"?t.name.trim():"";return{stat:e,...i?{name:i}:{}}}).filter(Boolean),Yr=n=>(Array.isArray(n)?n:[]).map(t=>{if(!t||typeof t!="object")return null;let e=typeof t.stat_consumption=="string"?t.stat_consumption.trim():"";if(!e)return null;let i=typeof t.name=="string"?t.name.trim():"";return{stat:e,...i?{name:i}:{}}}).filter(Boolean),Zr=n=>Ji(n).filter(t=>Wi.test(t)).sort(),Xr=n=>Ji(n).filter(t=>jr.test(t)).sort(),Yi=({config:n,prefs:t,statisticIds:e})=>{let i=n?.metering_point,r=typeof i?.number=="string"?i.number.trim():"",s="auto",o;if(r)s="yaml",o={consumption:Zt("consumption",r),cost:Zt("cost",r),price:Zt("price",r),temperature:Zt("temperature",r)};else{let u=Zr(e);if(!u.length)throw new Error("No Fortum metering point statistics found. Set strategy.metering_point.number.");if(u.length>1)throw new Error(`Single strategy found multiple Fortum metering points: ${u.join(", ")}. Set strategy.metering_point.number.`);o=Wr(u[0])}let a;if(Gr(i,"itemization")){if(!Array.isArray(i.itemization))throw new Error("strategy.metering_point.itemization must be a list when provided.");a=Jr(i.itemization)}else a=Yr(t?.device_consumption);let c=typeof i?.temperature=="string"?i.temperature.trim():"",d=!!c;return{source:s,metrics:{consumption:[o.consumption],cost:[o.cost],price:[o.price],temperature:[c||o.temperature],temperature_override:d,itemizations:a,price_forecast:Xr(e)}}};var Qr=(n,t,e=!1,i,r)=>{let s={title:typeof r=="string"&&r.trim()?r.trim():Ee(t,"ui.panel.energy.title.electricity","Electricity"),path:"electricity",type:"sections",sections:[]},o=[];return o.push({type:"custom:fortum-energy-spacer-card",grid_options:{columns:6}}),o.push({title:Ee(t,"ui.panel.energy.cards.energy_date_selection_title","Time range"),type:"energy-date-selection",collection_key:n,disable_compare:!0,opening_direction:"right",vertical_opening_direction:"down",grid_options:{columns:12}}),o.push({type:"custom:fortum-energy-quick-ranges-card",collection_key:n,debug:e,grid_options:{columns:12}}),o.push({type:"custom:fortum-energy-spacer-card",grid_options:{columns:6}}),o.push({type:"custom:fortum-energy-devices-adaptive-graph-card",collection_key:n,debug:e,resolved_metrics:i,grid_options:{columns:36}}),o.push({title:"Price of Tomorrow",type:"custom:fortum-energy-future-price-card",collection_key:n,debug:e,resolved_metrics:i,grid_options:{columns:36}}),o.push({type:"custom:fortum-energy-spacer-card"}),s.sections.push({type:"grid",column_span:3,cards:o}),s},et=class extends HTMLElement{static async getConfigElement(){return await Promise.resolve().then(()=>(Ne(),Ki)),document.createElement("fortum-energy-single-strategy-editor")}static async generate(t,e){try{let i=Kt(t||{}),r=i.collection_key||i.collectionKey||I,s=i.debug===!0,o=await Mt(e),a=typeof i?.metering_point?.number=="string"&&i.metering_point.number.trim().length>0,c=[];try{c=await e.callWS({type:"recorder/list_statistic_ids"})}catch(u){if(!a)throw u}let{metrics:d}=Yi({config:i,prefs:o,statisticIds:c});return{views:[Qr(r,e,s,d,i.electricity_title||i?.metering_point?.name)]}}catch(i){return{views:[{title:"Error",path:"error",cards:[{type:"markdown",content:`Error loading fortum-energy strategy:
> ${i&&i.message?i.message:String(i)}`}]}]}}}static async generateDashboard(t){return this.generate(t.strategy||{},t.hass)}},Xt=class extends et{};kt();Ct();var ts=n=>typeof n=="number"&&Number.isFinite(n)?String(Math.trunc(n)):typeof n=="string"&&n.trim()||null,Zi=n=>new Set((Array.isArray(n)?n:[]).map(t=>typeof t=="string"?t:t?.statistic_id).filter(t=>typeof t=="string"&&t.length)),Xi=(n,t,e)=>{let i=Ae(n,t);if(!i)return{forecastIds:[],forecastError:`Metering point sensor with metering_point_no=${t} is missing.`};let r=i.entityId,o=i.stateObj?.attributes?.price_area;if(typeof o!="string"||!o.trim())return{forecastIds:[],forecastError:`Sensor ${r} has no attribute price_area.`};let a=`fortum:price_forecast_${o.trim().toLowerCase()}`;return e.has(a)?{forecastIds:[a],forecastError:null}:{forecastIds:[],forecastError:`Price statistic ${a} has no values.`}},Qi=(n,t,e)=>(!n||!Array.isArray(n.sections)||n.sections.forEach(i=>{Array.isArray(i?.cards)&&i.cards.forEach(r=>{if(r?.type!=="custom:fortum-energy-future-price-card")return;let s=r.resolved_metrics||{};r.resolved_metrics={...s,price_forecast:t,future_price_error:e}})}),n),tr=(n,t)=>(Array.isArray(n?.metering_points)?n.metering_points:[]).map(e=>{let i=ts(e.number),s=(i?Ae(t,i):null)?.stateObj?.attributes?.address,o=typeof s=="string"&&s.trim()?s.trim():void 0,a={...n,metering_point:{...n?.metering_point||{}}};return delete a.metering_points,i&&(a.metering_point.number=i),a.metering_point.itemization=e.itemization,e.name?a.metering_point.name=e.name:delete a.metering_point.name,typeof e.temperature=="string"&&e.temperature.trim()?a.metering_point.temperature=e.temperature.trim():delete a.metering_point.temperature,a.electricity_title=e.name||o||e.number,a});var Qt=class extends et{static async getConfigElement(){return await Promise.resolve().then(()=>(Ie(),Gi)),document.createElement("fortum-energy-multipoint-strategy-editor")}static async generate(t,e){let i=Wt(t||{}),r=i.metering_points,s=[];try{s=await e.callWS({type:"recorder/list_statistic_ids"})}catch{s=[]}let o=Zi(s),a=[],c=tr(i,e);for(let d=0;d<r.length;d+=1){let u=r[d],h=c[d],_=h?.metering_point?.number||String(u.number),p=await super.generate(h,e),y=Array.isArray(p?.views)?p.views:[],x=y.find(w=>w?.path==="electricity"),g=y[0],b=x||g;if(!b)continue;let{forecastIds:v,forecastError:E}=Xi(e,_,o),m={...b,title:h.electricity_title,path:`electricity-${d+1}`};a.push(Qi(m,v,E))}return{views:a}}};var es=()=>{try{let t=new URL(import.meta.url,globalThis?.location?.href).searchParams.get("v");if(typeof t=="string"&&t.trim().length)return t.trim()}catch{}return"unknown"};globalThis.__fortumEnergyIntegrationVersion=es();var O=(n,t)=>{typeof customElements>"u"||customElements.get(n)||customElements.define(n,t)};typeof process<"u"&&process?.versions?.node&&(globalThis.__fortumEnergyStrategyTestHooks={normalizeEnergySourceOverrides:at,deriveEnergyRuntimeConfig:he});O("fortum-energy-custom-legend-card",Rt);O("fortum-energy-spacer-card",Yt);O("fortum-energy-quick-ranges-card",jt);O("fortum-energy-devices-detail-overlay-card",Bt);O("fortum-energy-devices-adaptive-graph-card",Vt);O("fortum-energy-future-price-card",qt);O("fortum-energy-single-strategy-editor",ft);O("fortum-energy-multipoint-strategy-editor",_t);try{O("ll-strategy-dashboard-fortum-energy-single",et),O("ll-strategy-dashboard-fortum-energy-multipoint",Qt),O("ll-strategy-dashboard-fortum-energy",Xt)}catch(n){console.error("[fortum-energy] strategy registration failed",n)}
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
