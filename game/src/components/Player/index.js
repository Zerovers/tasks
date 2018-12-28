import './index.css';
import pause from '../../utility/pause';

import playerHead from './image/player_head.png';
import playerBody from './image/player_body.png';
import playerRightHand from './image/player_rightHand.png';
import playerLeftHand from './image/player_leftHand.png';
import playerLeftFinger from './image/player_leftFinger.png';
import playerRightLeg from './image/player_rightLeg.png';
import playerLeftLeg from './image/player_leftLeg.png';
import playerWeapon from './image/player_weapon.png';

import playerSpellFrostbolt from './image/spells/spell_frostbolt.png';
import playerSpellFireball from './image/spells/spell_fireball.png';
import playerSpellArcaneblast from './image/spells/spell_arcaneblast.png';
import playerSpellArcaneMissile from './image/spells/spell_arcanemissle.png';
import playerSpellShadowbolt from './image/spells/spell_shadowbolt.png';
import playerSpellHealAura from './image/spells/spell_heal_aura.png';

import spellSoundFrostbolt from './sounds/frostbolt.wav';
import spellSoundFireball from './sounds/fireball.wav';
import spellSoundArcaneBlast from './sounds/arcaneblast.wav';
import spellSoundArcaneMissile from './sounds/arcanemissile.wav';
import spellSoundShadowbolt from './sounds/shadowbolt.wav';
import spellSoundPlayerTakeDamage from './sounds/player_take_damage.wav';
import spellSoundHeal from './sounds/heal.wav';

const PLACE_PLAYER_IN_BATTLE_ARENA = '.conteiner';
const PLACE_PLAYER_SPELL_IN_BATTLE_ARENA = '.player-Model .conteiner ';
export default class Player {
  constructor(name, hp, countMonsters) {
    this.name = name;
    this.hp = hp;
    this.countMonsters = countMonsters;
    this.getDmg = 20;
    $('.player > p.player-name').html(name);
  }

  indicationHp() {
    $('.player-hp span').css('width', `${this.hp * 5}px`);
  }

  killMonsters() {
    this.countMonsters += 1;
  }

  getDamage() {
    this.hp -= this.getDmg;
    $('.player-hp > span').css('width', `${this.hp * 5}px`);
    $('.player-hp').css('animation', 'shake 1s linear');
    Player.addAnimationTakeDamage();
  }

  getHeal() {
    this.hp += 20;
    if (this.hp >= 100) {
      this.hp = 100;
    }
    $('.player-hp > span').css('width', `${this.hp * 5}px`);
    $('.heal').css('visibility', 'hidden');
  }

  reset() {
    this.hp = 100;
    this.getDmg = 20;
    this.countMonsters = 0;
    this.indicationHp();
  }

  static renderBody() {
    $(PLACE_PLAYER_IN_BATTLE_ARENA)
      .append(`<img src="${playerBody}" alt="mageBody" class="mage-body">`)
      .append(`<img src="${playerHead}" alt="mageBody" class="mage-head activeHead">`)
      .append(`<img src="${playerLeftLeg}" alt="mageBody" class="mage-leftLeg">`)
      .append(`<img src="${playerRightLeg}" alt="mageBody" class="mage-RightLeg">`)
      .append(`<img src="${playerRightHand}" alt="mageBody" class="mage-rightHand">`)
      .append(`<img src="${playerLeftHand}" alt="mageBody" class="mage-leftHand">`)
      .append(`<img src="${playerLeftFinger}" alt="mageBody" class="mage-leftFinger">`)
      .append(`<img src="${playerWeapon}" alt="mageBody" class="mage-weapon">`);
    $(PLACE_PLAYER_SPELL_IN_BATTLE_ARENA)
      .append(`<img src="${playerSpellFrostbolt}" alt="spell_frostbolt" class="spell frostbolt">`)
      .append(`<img src="${playerSpellFireball}" alt="spell_fireball" class="spell fireball">`)
      .append(`<img src="${playerSpellArcaneblast}" alt="spell_arcaneblast" class="spell arcaneblast">`)
      .append(`<img src="${playerSpellArcaneMissile}" alt="spell_arcanemissle" class="spell arcanemissile">`)
      .append(`<img src="${playerSpellShadowbolt}" alt="spell_shadowbolt" class="spell shadowbolt">`)
      .append(`<img src="${playerSpellHealAura}" alt="spell_heal" class="heal">`);
  }

  static async addAnimationAttack(name) {
    $('.mage-body').addClass('mage-body_active');
    $('.mage-leftHand').addClass('mage-leftHand_active');
    $('.mage-rightHand').addClass('mage-rightHand_active');
    $('.mage-leftFinger').addClass('mage-leftFinger_active');
    $('.mage-leftLeg').addClass('mage-leftLeg_active');
    $('.mage-weapon').addClass('mage-weapon_active');
    Player.addSound(name);
    await pause(1000);
    switch (name) {
      case 'frostbolt':
        $('.spell.frostbolt').css('visibility', 'visible');
        break;
      case 'fireball':
        $('.spell.fireball').css('visibility', 'visible');
        break;
      case 'arcaneblast':
        $('.spell.arcaneblast').css('visibility', 'visible');
        break;
      case 'arcanemissile':
        $('.spell.arcanemissile').css('visibility', 'visible');
        break;
      case 'shadowbolt':
        $('.spell.shadowbolt').css('visibility', 'visible');
        break;
      default:
    }
    await pause(100);
    const position = $('.enemy-Model .conteiner').position().left;
    $('.spell').css('left', position - 20);
  }

  static async addAnimationTakeDamage() {
    $('.mage-head').removeClass('activeHead');
    $('.mage-head').addClass('mage-take-damage_head');
    $('.mage-body').addClass('mage-take-damage_body');
    $('.mage-leftHand').addClass('mage-take-damage_leftHand');
    $('.mage-rightHand').addClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').addClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').addClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').addClass('mage-take-damage_leftLeg');
    $('.mage-weapon').addClass('mage-take-damage_weapon');
    Player.addSound('takeDamage');
    await pause(500);
    $('.mage-head').addClass('activeHead');
  }

  static addAnimationHealing() {
    $('.mage-leftHand').addClass('mage-take-heal_leftHand');
    $('.mage-rightHand').addClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').addClass('mage-take-heal_leftFinger');
    $('.mage-weapon').addClass('mage-take-heal_weapon');
    $('.heal').css('visibility', 'visible');
    Player.addSound('heal');
  }

  static removeAnimationAttack() {
    $('.mage-body').removeClass('mage-body_active');
    $('.mage-leftHand').removeClass('mage-leftHand_active');
    $('.mage-rightHand').removeClass('mage-rightHand_active');
    $('.mage-leftFinger').removeClass('mage-leftFinger_active');
    $('.mage-leftLeg').removeClass('mage-leftLeg_active');
    $('.mage-weapon').removeClass('mage-weapon_active');
  }

  static removeAnimationTakeDamage() {
    $('.mage-head').removeClass('mage-take-damage_head');
    $('.mage-body').removeClass('mage-take-damage_body');
    $('.mage-leftHand').removeClass('mage-take-damage_leftHand');
    $('.mage-rightHand').removeClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').removeClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').removeClass('mage-take-damage_leftLeg');
    $('.mage-weapon').removeClass('mage-take-damage_weapon');
  }

  static removeAnimationHealing() {
    $('.mage-leftHand').removeClass('mage-take-heal_leftHand');
    $('.mage-rightHand').removeClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-heal_leftFinger');
    $('.mage-weapon').removeClass('mage-take-heal_weapon');
  }

  static removeAnimations() {
    Player.removeAnimationAttack();
    Player.removeAnimationHealing();
    Player.removeAnimationTakeDamage();
  }

  static addSound(name) {
    const takeDamage = new Audio(`${spellSoundPlayerTakeDamage}`);
    const frostbolt = new Audio(`${spellSoundFrostbolt}`);
    const fireball = new Audio(`${spellSoundFireball}`);
    const arcaneblast = new Audio(`${spellSoundArcaneBlast}`);
    const arcanemissle = new Audio(`${spellSoundArcaneMissile}`);
    const shadowbolt = new Audio(`${spellSoundShadowbolt}`);
    const heal = new Audio(`${spellSoundHeal}`);
    switch (name) {
      case 'takeDamage':
        takeDamage.play();
        break;
      case 'frostbolt':
        frostbolt.volume = 0.2;
        frostbolt.play();
        break;
      case 'fireball':
        fireball.volume = 0.2;
        fireball.play();
        break;
      case 'arcaneblast':
        arcaneblast.volume = 0.2;
        arcaneblast.play();
        break;
      case 'arcanemissile':
        arcanemissle.volume = 0.2;
        arcanemissle.play();
        break;
      case 'shadowbolt':
        shadowbolt.volume = 0.2;
        shadowbolt.play();
        break;
      case 'heal':
        heal.play();
        break;
      default:
    }
  }
}
