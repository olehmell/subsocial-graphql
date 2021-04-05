import { BaseModel, IntField, NumericField, DateTimeField, Model, ManyToMany, EnumField, StringField } from 'warthog';

import BN from 'bn.js';

import { JoinTable } from 'typeorm';

import { Tag } from '../tag/tag.model';

import { PostKind } from '../enums/enums';
export { PostKind };

@Model({ api: {} })
export class Post extends BaseModel {
  @StringField({
    nullable: true
  })
  createdByAccount?: string;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined
    }
  })
  createdAtBlock?: BN;

  @DateTimeField({
    nullable: true
  })
  createdAtTime?: Date;

  @StringField({})
  postId!: string;

  @DateTimeField({
    nullable: true
  })
  updatedAtTime?: Date;

  @StringField({})
  spaceId!: string;

  @StringField({
    nullable: true
  })
  content?: string;

  @EnumField('PostKind', PostKind, {
    nullable: true
  })
  kind?: PostKind;

  @StringField({
    nullable: true
  })
  parentId?: string;

  @StringField({
    nullable: true
  })
  rootPostId?: string;

  @StringField({
    nullable: true
  })
  sharedPostId?: string;

  @IntField({
    nullable: true
  })
  repliesCount?: number;

  @IntField({
    nullable: true
  })
  publicRepliesCount?: number;

  @IntField({
    nullable: true
  })
  hiddenRepliesCount?: number;

  @IntField({
    nullable: true
  })
  sharesCount?: number;

  @IntField({
    nullable: true
  })
  upvotesCount?: number;

  @IntField({
    nullable: true
  })
  downvotesCount?: number;

  @IntField({
    nullable: true
  })
  score?: number;

  @StringField({
    nullable: true
  })
  title?: string;

  @StringField({
    nullable: true
  })
  slug?: string;

  @StringField({
    nullable: true
  })
  summary?: string;

  @StringField({
    nullable: true
  })
  image?: string;

  @StringField({
    nullable: true
  })
  canonical?: string;

  @StringField({
    nullable: true
  })
  tagsOriginal?: string;

  @ManyToMany(
    () => Tag,
    (param: Tag) => param.posts
  )
  tags!: Tag[];

  constructor(init?: Partial<Post>) {
    super();
    Object.assign(this, init);
  }
}