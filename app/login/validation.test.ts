import { it, expect, describe } from "vitest";
import { schema } from "./validation";
import { FORM_FIELDS } from "./constants";

describe("Schema Validation", () => {
  describe("Phone Validation", () => {
    it("should throw error when phone number is empty", async () => {
      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, { [FORM_FIELDS.PHONE]: "" })
      ).rejects.toThrow();
    });
    it("should throw error when character entered as phone number", async () => {
      const IN_VALID_NUMBER = { [FORM_FIELDS.PHONE]: "09sss555" };

      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, IN_VALID_NUMBER)
      ).rejects.toThrow();
    });
    it("should throw error when number length is not equal 11", async () => {
      const IN_VALID_NUMBER = { [FORM_FIELDS.PHONE]: "0912345678" };
      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, IN_VALID_NUMBER)
      ).rejects.toThrow();
    });
    it("should throw error when number length is not equal 11", async () => {
      const IN_VALID_NUMBER = { [FORM_FIELDS.PHONE]: "091234567891" };

      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, IN_VALID_NUMBER)
      ).rejects.toThrow();
    });
    it("should throw error when phone number is not start with 09", async () => {
      const IN_VALID_NUMBER = { [FORM_FIELDS.PHONE]: "02123456789" };
      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, IN_VALID_NUMBER)
      ).rejects.toThrow();
    });
    it("should passed the test when phone number is correct", async () => {
      const VALID_NUMBER = { [FORM_FIELDS.PHONE]: "09123456789" };
      await expect(
        schema.validateAt(FORM_FIELDS.PHONE, VALID_NUMBER)
      ).resolves.not.toThrow();
    });
  });
  describe("password validation", () => {
    it("should throw error on empty password", async () => {
      const INVALID_PASS = { [FORM_FIELDS.PASSWORD]: "" };
      await expect(
        schema.validateAt(FORM_FIELDS.PASSWORD, INVALID_PASS)
      ).rejects.toThrow();
    });
    it("should pass when password has value", async () => {
      const INVALID_PASS = { [FORM_FIELDS.PASSWORD]: "any value" };
      await expect(
        schema.validateAt(FORM_FIELDS.PASSWORD, INVALID_PASS)
      ).resolves.not.toThrow();
    });
  });
});
